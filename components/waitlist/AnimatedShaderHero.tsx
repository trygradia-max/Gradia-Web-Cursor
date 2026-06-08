"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

/**
 * Animated WebGL2 nebula hero (adapted from ravikatiyar/animated-shader-hero on
 * 21st.dev, shader by @atzedent). Changes for Gradia:
 *  - recolored the warm orange/amber nebula to purple/silver on black
 *  - dropped the pointer-interactivity (this shader's main() never reads it)
 *  - half-res canvas + pauses when off-screen / tab hidden (perf)
 *  - Gradia copy + brand CTAs, full-screen.
 */
const VERT = `#version 300 es
precision highp float;
in vec4 position;
void main(){ gl_Position = position; }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p){ p=fract(p*vec2(12.9898,78.233)); p+=dot(p,p+34.56); return fract(p.x*p.y); }
float noise(in vec2 p){
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for(int i=0;i<5;i++){ t+=a*noise(p); p*=2.*m; a*=.5; }
  return t;
}
float clouds(vec2 p){
  float d=1., t=.0;
  for(float i=.0;i<3.;i++){
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a); d=a; p*=2./(i+1.);
  }
  return t;
}
void main(void){
  vec2 uv=(FC-.5*R)/MN, st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for(float i=1.;i<12.;i++){
    uv+=.1*cos(i*vec2(.1+.01*i,.8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    // deep purple filaments — heavy on red+blue, almost no green, so they
    // read violet instead of blowing out to white
    col+=.0019/d*(cos(sin(i)*vec3(1,2,3))+1.)*vec3(.62,.16,1.5);
    float b=noise(i+p+bg*1.731);
    // restrained sparkle (kept tinted, not pure white)
    col+=.0013*b/length(max(p,vec2(b*p.x*.02,p.y)))*vec3(.7,.55,1.);
    // dark, saturated purple haze filling the frame
    col=mix(col,vec3(bg*.13,bg*.035,bg*.34),d);
  }
  O=vec4(col*1.05,1);
}`;

export function AnimatedShaderHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error("shader error:", gl.getShaderInfoLog(sh));
      }
      return sh;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "resolution");
    const uTime = gl.getUniformLocation(program, "time");

    // Size the drawing buffer to the canvas's ACTUAL rendered size, not the
    // window — on Safari 100vh ≠ innerHeight (address bar), so using innerHeight
    // stretched the buffer vertically and squashed the nebula. clientWidth/Height
    // always match what's on screen, and a ResizeObserver keeps it in sync as
    // the Safari toolbar shows/hides.
    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("resize", resize);

    const render = (now: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, now * 1e-3);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let raf = 0;
    let running = false;
    let onScreen = false;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      render(now);
    };
    const start = () => {
      if (running || reduceMotion || document.hidden || !onScreen) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    render(0); // one frame so it's never black
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        onScreen ? start() : stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      ro.disconnect();
      io.disconnect();
      stop();
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, []);

  const rise = (delay: string) => ({
    animation: "wl-fade-up 0.8s cubic-bezier(0.22,1,0.36,1) both",
    animationDelay: delay,
  });

  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{ background: "#000" }}
      />
      {/* light vignette only at the far edges — let the nebula fill the screen */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 95% at 50% 50%, transparent 55%, rgba(0,0,0,0.42) 100%)",
        }}
      />
      {/* soft dark pad directly behind the copy for legibility */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 46% 38% at 50% 50%, rgba(5,4,12,0.5), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center">
        <div style={rise("0s")} className="mb-7 flex justify-center">
          <Logo variant="light" className="text-2xl sm:text-3xl" />
        </div>
        <span
          style={rise("0.1s")}
          className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/70 backdrop-blur-sm"
        >
          <span className="wl-dot-pulse h-1.5 w-1.5 rounded-full bg-[var(--brand-primary)]" />
          Now in private beta · Founding 100 get 50% off for life
        </span>

        <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-7xl">
          <span style={rise("0.2s")} className="block">
            Your entire front office. One app.
          </span>
          <span
            style={rise("0.35s")}
            className="block bg-gradient-to-r from-[#a78bfa] via-white to-[#c8ccd4] bg-clip-text text-transparent"
          >
            Zero missed jobs.
          </span>
        </h1>

        <p
          style={rise("0.5s")}
          className="mx-auto mt-6 max-w-2xl text-base text-white/70 sm:text-lg"
        >
          Gradia is 7 AI agents that answer your phone, quote every car, fill
          your calendar, collect your money, and bring back old customers — so
          you keep your hands on the car.
        </p>

        <div
          style={rise("0.65s")}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <a
            href="#waitlist"
            className="wl-cta inline-flex items-center gap-2 rounded-[100px] bg-gradient-to-r from-[#7c3aed] to-[#a78bfa] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_36px_rgba(124,58,237,0.45)] transition-transform hover:scale-[1.03]"
          >
            Join the waitlist
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#cast"
            className="inline-flex items-center gap-2 rounded-[100px] border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
          >
            See how it works
          </a>
        </div>
      </div>

      {/* fade into the page below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-[var(--bg)]"
      />
    </section>
  );
}
