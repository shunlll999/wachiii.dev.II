"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    if (!cursor || !ring) return;
    let rx = 0, ry = 0, cx = 0, cy = 0, raf: number;

    const onMove = (e: MouseEvent) => {
      cx = e.clientX; cy = e.clientY;
      cursor.style.left = `${cx - 3}px`;
      cursor.style.top  = `${cy - 3}px`;
    };
    const animate = () => {
      rx += (cx - rx) * 0.12; ry += (cy - ry) * 0.12;
      ring.style.left = `${rx - 14}px`; ring.style.top = `${ry - 14}px`;
      raf = requestAnimationFrame(animate);
    };
    const onEnter = () => { ring.style.width = "48px"; ring.style.height = "48px"; cursor.style.transform = "scale(0)"; };
    const onLeave = () => { ring.style.width = "28px"; ring.style.height = "28px"; cursor.style.transform = "scale(1)"; };

    document.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);
    document.querySelectorAll("a, button").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef}   className="cursorRing" />
    </>
  );
}
