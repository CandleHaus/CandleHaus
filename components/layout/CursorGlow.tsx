"use client";

import { useEffect, useState } from "react";

export function CursorGlow() {
  const [point, setPoint] = useState({ x: -40, y: -40 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => setPoint({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed z-[70] hidden h-3 w-3 rounded-full bg-amber shadow-[0_0_22px_rgba(215,169,93,.55)] transition-transform duration-150 lg:block"
      style={{ transform: `translate(${point.x - 6}px, ${point.y - 6}px)` }}
    />
  );
}
