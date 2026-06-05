"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * WebGL shader backdrop (adapted from aliimam/shader-animation on 21st.dev),
 * recolored to Gradia blue (#7c3aed) and made to fill its positioned parent
 * rather than the full screen. Respects prefers-reduced-motion by rendering a
 * single static frame instead of looping.
 */
export function ShaderAnimation({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    uniforms: { time: { value: number }; resolution: { value: THREE.Vector2 } };
    animationId: number;
  } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    // Brand-blue tint: the original sums three RGB channels of line energy;
    // we collapse that into a single intensity and paint it in Gradia blue,
    // with a soft white-blue highlight on the brightest strands.
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;

        float intensity = 0.0;
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            intensity += lineWidth * float(i * i) /
              abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }

        vec3 brand = vec3(0.486, 0.227, 0.929);        // #7c3aed purple
        vec3 highlight = vec3(0.80, 0.70, 1.0);         // bright lilac-white
        vec3 color = brand * intensity + highlight * pow(intensity * 0.4, 2.2);
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const camera = new THREE.Camera();
    camera.position.z = 1;

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(2, 2);

    const uniforms = {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    };
    onResize();
    window.addEventListener("resize", onResize);

    sceneRef.current = { renderer, uniforms, animationId: 0 };

    // Only run the GPU loop while the canvas is on-screen and the tab is
    // visible — otherwise four background animations compete for the GPU at
    // once and the whole page stutters.
    let running = false;
    let rafId = 0;
    let onScreen = false;
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    };
    const start = () => {
      if (running || reduceMotion || document.hidden || !onScreen) return;
      running = true;
      loop();
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(rafId);
    };

    renderer.render(scene, camera); // one static frame so it's never blank
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        onScreen ? start() : stop();
      },
      { threshold: 0 },
    );
    io.observe(container);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
      stop();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className={className}
      style={{ background: "#0a0810", overflow: "hidden" }}
    />
  );
}

export default ShaderAnimation;
