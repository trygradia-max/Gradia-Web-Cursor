"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * Spiral particle animation (adapted from Kain0127/spiral-animation on 21st.dev).
 * Changes from the original: SSR-safe sizing (no window access at init),
 * Gradia-blue particles on a near-black field, and a static frame when the
 * visitor prefers reduced motion.
 */
const STAR_COLOR = "#c4b5fd"; // lilac / silver-purple particles
const BG_COLOR = "#0a0810";

class Vector2D {
  constructor(public x: number, public y: number) {}
  static random(min: number, max: number): number {
    return min + Math.random() * (max - min);
  }
}

class Vector3D {
  constructor(public x: number, public y: number, public z: number) {}
}

class AnimationController {
  private timeline: gsap.core.Timeline;
  private time = 0;
  private ctx: CanvasRenderingContext2D;
  private size: number;
  private stars: Star[] = [];

  private readonly changeEventTime = 0.32;
  private readonly cameraZ = -400;
  private readonly cameraTravelDistance = 3400;
  private readonly startDotYOffset = 28;
  private readonly viewZoom = 100;
  private readonly numberOfStars = 2800;
  private readonly trailLength = 80;

  constructor(ctx: CanvasRenderingContext2D, size: number) {
    this.ctx = ctx;
    this.size = size;
    this.timeline = gsap.timeline({ repeat: -1 });
    this.createStars();
    this.setupTimeline();
  }

  private createStars() {
    for (let i = 0; i < this.numberOfStars; i++) {
      this.stars.push(new Star(this.cameraZ, this.cameraTravelDistance));
    }
  }

  private setupTimeline() {
    this.timeline.to(this, {
      time: 1,
      duration: 15,
      repeat: -1,
      ease: "none",
      onUpdate: () => this.render(),
    });
  }

  public ease(p: number, g: number): number {
    if (p < 0.5) return 0.5 * Math.pow(2 * p, g);
    return 1 - 0.5 * Math.pow(2 * (1 - p), g);
  }

  public easeOutElastic(x: number): number {
    const c4 = (2 * Math.PI) / 4.5;
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    return Math.pow(2, -8 * x) * Math.sin((x * 8 - 0.75) * c4) + 1;
  }

  public map(v: number, a1: number, a2: number, b1: number, b2: number): number {
    return b1 + (b2 - b1) * ((v - a1) / (a2 - a1));
  }

  public constrain(v: number, min: number, max: number): number {
    return Math.min(Math.max(v, min), max);
  }

  public lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }

  public spiralPath(p: number): Vector2D {
    p = this.constrain(1.2 * p, 0, 1);
    p = this.ease(p, 1.8);
    const numberOfSpiralTurns = 6;
    const theta = 2 * Math.PI * numberOfSpiralTurns * Math.sqrt(p);
    const r = 170 * Math.sqrt(p);
    return new Vector2D(
      r * Math.cos(theta),
      r * Math.sin(theta) + this.startDotYOffset,
    );
  }

  public rotate(v1: Vector2D, v2: Vector2D, p: number, orientation: boolean): Vector2D {
    const middle = new Vector2D((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
    const dx = v1.x - middle.x;
    const dy = v1.y - middle.y;
    const angle = Math.atan2(dy, dx);
    const o = orientation ? -1 : 1;
    const r = Math.sqrt(dx * dx + dy * dy);
    const bounce = Math.sin(p * Math.PI) * 0.05 * (1 - p);
    return new Vector2D(
      middle.x + r * (1 + bounce) * Math.cos(angle + o * Math.PI * this.easeOutElastic(p)),
      middle.y + r * (1 + bounce) * Math.sin(angle + o * Math.PI * this.easeOutElastic(p)),
    );
  }

  public showProjectedDot(position: Vector3D, sizeFactor: number) {
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);
    const newCameraZ = this.cameraZ + this.ease(Math.pow(t2, 1.2), 1.8) * this.cameraTravelDistance;
    if (position.z > newCameraZ) {
      const depth = position.z - newCameraZ;
      const x = (this.viewZoom * position.x) / depth;
      const y = (this.viewZoom * position.y) / depth;
      const sw = (400 * sizeFactor) / depth;
      // fillRect is dramatically cheaper than beginPath/arc/fill per particle —
      // with thousands of dots per frame this is the difference between 15fps
      // and 60fps. A 1–2px square is visually identical to a 1px dot.
      const s = sw < 0.8 ? 0.8 : sw > 2.4 ? 2.4 : sw;
      this.ctx.fillRect(x, y, s, s);
    }
  }

  private drawStartDot() {
    if (this.time > this.changeEventTime) {
      const dy = (this.cameraZ * this.startDotYOffset) / this.viewZoom;
      const position = new Vector3D(0, dy, this.cameraTravelDistance);
      this.showProjectedDot(position, 2.5);
    }
  }

  public render() {
    const ctx = this.ctx;
    if (!ctx) return;
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, this.size, this.size);
    ctx.save();
    ctx.translate(this.size / 2, this.size / 2);
    const t1 = this.constrain(this.map(this.time, 0, this.changeEventTime + 0.25, 0, 1), 0, 1);
    const t2 = this.constrain(this.map(this.time, this.changeEventTime, 1, 0, 1), 0, 1);
    ctx.rotate(-Math.PI * this.ease(t2, 2.7));
    this.drawTrail(t1);
    ctx.fillStyle = STAR_COLOR;
    for (const star of this.stars) star.render(t1, this);
    this.drawStartDot();
    ctx.restore();
  }

  private drawTrail(t1: number) {
    for (let i = 0; i < this.trailLength; i++) {
      const f = this.map(i, 0, this.trailLength, 1.1, 0.1);
      const sw = (1.3 * (1 - t1) + 3.0 * Math.sin(Math.PI * t1)) * f;
      this.ctx.fillStyle = STAR_COLOR;
      this.ctx.lineWidth = sw;
      const pathTime = t1 - 0.00015 * i;
      const basePos = this.spiralPath(pathTime);
      const offset = new Vector2D(basePos.x + 5, basePos.y + 5);
      const rotated = this.rotate(
        basePos,
        offset,
        Math.sin(this.time * Math.PI * 2) * 0.5 + 0.5,
        i % 2 === 0,
      );
      const s = Math.max(0.8, sw);
      this.ctx.fillRect(rotated.x - s / 2, rotated.y - s / 2, s, s);
    }
  }

  public staticFrame() {
    this.timeline.pause();
    this.time = 0.62;
    this.render();
  }

  public pause() {
    this.timeline.pause();
  }

  public resume() {
    this.timeline.play();
  }

  public destroy() {
    this.timeline.kill();
  }
}

class Star {
  private dx: number;
  private dy: number;
  private spiralLocation: number;
  private strokeWeightFactor: number;
  private z: number;
  private angle: number;
  private distance: number;
  private rotationDirection: number;
  private expansionRate: number;
  private finalScale: number;

  constructor(cameraZ: number, cameraTravelDistance: number) {
    this.angle = Math.random() * Math.PI * 2;
    this.distance = 30 * Math.random() + 15;
    this.rotationDirection = Math.random() > 0.5 ? 1 : -1;
    this.expansionRate = 1.2 + Math.random() * 0.8;
    this.finalScale = 0.7 + Math.random() * 0.6;
    this.dx = this.distance * Math.cos(this.angle);
    this.dy = this.distance * Math.sin(this.angle);
    this.spiralLocation = (1 - Math.pow(1 - Math.random(), 3.0)) / 1.3;
    this.z = Vector2D.random(0.5 * cameraZ, cameraTravelDistance + cameraZ);
    const lerp = (s: number, e: number, t: number) => s * (1 - t) + e * t;
    this.z = lerp(this.z, cameraTravelDistance / 2, 0.3 * this.spiralLocation);
    this.strokeWeightFactor = Math.pow(Math.random(), 2.0);
  }

  render(p: number, c: AnimationController) {
    const spiralPos = c.spiralPath(this.spiralLocation);
    const q = p - this.spiralLocation;
    if (q <= 0) return;
    const progress = c.constrain(4 * q, 0, 1);
    const elasticEasing = c.easeOutElastic(progress);
    const powerEasing = Math.pow(progress, 2);

    let screenX: number;
    let screenY: number;
    if (progress < 0.3) {
      const easing = c.lerp(progress, powerEasing, progress / 0.3);
      screenX = c.lerp(spiralPos.x, spiralPos.x + this.dx * 0.3, easing / 0.3);
      screenY = c.lerp(spiralPos.y, spiralPos.y + this.dy * 0.3, easing / 0.3);
    } else if (progress < 0.7) {
      const midProgress = (progress - 0.3) / 0.4;
      const curveStrength = Math.sin(midProgress * Math.PI) * this.rotationDirection * 1.5;
      const baseX = spiralPos.x + this.dx * 0.3;
      const baseY = spiralPos.y + this.dy * 0.3;
      const targetX = spiralPos.x + this.dx * 0.7;
      const targetY = spiralPos.y + this.dy * 0.7;
      const perpX = -this.dy * 0.4 * curveStrength;
      const perpY = this.dx * 0.4 * curveStrength;
      screenX = c.lerp(baseX, targetX, midProgress) + perpX * midProgress;
      screenY = c.lerp(baseY, targetY, midProgress) + perpY * midProgress;
    } else {
      const finalProgress = (progress - 0.7) / 0.3;
      const baseX = spiralPos.x + this.dx * 0.7;
      const baseY = spiralPos.y + this.dy * 0.7;
      const targetDistance = this.distance * this.expansionRate * 1.5;
      const spiralTurns = 1.2 * this.rotationDirection;
      const spiralAngle = this.angle + spiralTurns * finalProgress * Math.PI;
      const targetX = spiralPos.x + targetDistance * Math.cos(spiralAngle);
      const targetY = spiralPos.y + targetDistance * Math.sin(spiralAngle);
      screenX = c.lerp(baseX, targetX, finalProgress);
      screenY = c.lerp(baseY, targetY, finalProgress);
    }

    const vx = ((this.z + 400) * screenX) / 100;
    const vy = ((this.z + 400) * screenY) / 100;
    const position = new Vector3D(vx, vy, this.z);

    let sizeMultiplier = 1.0;
    if (progress < 0.6) {
      sizeMultiplier = 1.0 + progress * 0.2;
    } else {
      const t = (progress - 0.6) / 0.4;
      sizeMultiplier = 1.2 * (1.0 - t) + this.finalScale * t;
    }
    const dotSize = 8.5 * this.strokeWeightFactor * sizeMultiplier;
    c.showProjectedDot(position, dotSize);
  }
}

export function SpiralAnimation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<AnimationController | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const onResize = () =>
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Render at a capped internal resolution and let CSS stretch it to fill —
    // a soft particle field upscales cleanly, and this keeps the per-frame
    // fill cheap (the dominant cost for a full-screen 2D canvas, especially
    // where 2D canvas is software-rasterized).
    const dpr = 1;
    const size = Math.min(Math.max(dimensions.width, dimensions.height), 720);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    ctx.scale(dpr, dpr);

    const controller = new AnimationController(ctx, size);
    animationRef.current = controller;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      controller.staticFrame();
      return () => {
        controller.destroy();
        animationRef.current = null;
      };
    }

    // Only spin while the canvas is on-screen and the tab is visible.
    controller.pause();
    let onScreen = false;
    const sync = () =>
      onScreen && !document.hidden ? controller.resume() : controller.pause();
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      controller.destroy();
      animationRef.current = null;
    };
  }, [dimensions]);

  return (
    <div className={className} aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}

export default SpiralAnimation;
