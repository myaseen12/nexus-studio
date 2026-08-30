"use client";

import { useEffect, useState } from "react";

export function AmbientBackground() {
  const [coords, setCoords] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Offset values to keep the circular light centered on cursor
      setCoords({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-30 overflow-hidden">
      {/* Dynamic Cursor-Tracking Glow Spot */}
      <div
        className="absolute h-[450px] w-[450px] rounded-full bg-cyan-500/10 blur-[100px] transition-transform duration-[600ms] ease-out dark:bg-cyan-400/5"
        style={{
          transform: `translate3d(${coords.x - 225}px, ${coords.y - 225}px, 0)`,
          opacity: opacity,
          transitionProperty: "transform, opacity",
        }}
      />

      {/* Static ambient background glow to ensure beautiful default lighting */}
      <div className="absolute top-1/4 left-1/4 -z-40 h-[600px] w-[600px] rounded-full bg-indigo-500/10 blur-[130px] dark:bg-indigo-300/5" />
      <div className="absolute bottom-1/4 right-1/4 -z-40 h-[600px] w-[600px] rounded-full bg-fuchsia-500/5 blur-[130px] dark:bg-fuchsia-300/5" />
    </div>
  );
}
