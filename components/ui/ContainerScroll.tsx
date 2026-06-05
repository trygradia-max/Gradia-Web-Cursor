"use client";

import React, { useRef } from "react";
import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";

/**
 * Scroll-driven 3D tilt reveal (adapted from aceternity/container-scroll-animation
 * on 21st.dev). Frame recolored to Gradia's neutral/brand palette and the
 * overall height trimmed so it fits a single-page waitlist without dominating.
 */
export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [isMobile, setIsMobile] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // SSR and the first client paint render an identical static placeholder of
  // the same height; the scroll-driven motion only takes over after mount, so
  // framer-motion's transform styles never trigger a hydration mismatch.
  if (!mounted) {
    return (
      <div
        ref={containerRef}
        className="relative flex h-[44rem] items-center justify-center p-2 md:h-[60rem] md:p-20"
      >
        <div className="w-full py-10 md:py-40">
          <div className="mx-auto max-w-5xl text-center">{titleComponent}</div>
          <div className="mx-auto -mt-12 h-[28rem] w-full max-w-5xl rounded-[30px] border border-[var(--border)] bg-[var(--foreground)] p-2 md:h-[38rem] md:p-4">
            <div className="h-full w-full overflow-hidden rounded-2xl bg-[var(--bg-elevated)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-[44rem] items-center justify-center p-2 md:h-[60rem] md:p-20"
      ref={containerRef}
    >
      <div className="relative w-full py-10 md:py-40" style={{ perspective: "1000px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-5xl text-center">
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000001a, 0 37px 37px #00000017, 0 84px 50px #0000000d, 0 149px 60px #00000005",
      }}
      className="mx-auto -mt-12 h-[28rem] w-full max-w-5xl rounded-[30px] border border-[var(--border)] bg-[var(--foreground)] p-2 shadow-2xl md:h-[38rem] md:p-4"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-[var(--bg-elevated)]">
        {children}
      </div>
    </motion.div>
  );
};

export default ContainerScroll;
