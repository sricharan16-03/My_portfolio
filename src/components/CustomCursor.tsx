"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    // Track actual mouse coords
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const onMouseEnter = () => {
      setVisible(true);
    };

    // Smooth scroll position updates
    const animateCursor = () => {
      // Direct DOM mutation for buttery 60 FPS transitions
      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      if (outline) {
        // Outer ring follows with standard linear interpolation (lerp)
        outlineX += (mouseX - outlineX) * 0.12;
        outlineY += (mouseY - outlineY) * 0.12;
        outline.style.transform = `translate3d(${outlineX}px, ${outlineY}px, 0)`;
      }

      requestAnimationFrame(animateCursor);
    };

    const animationFrame = requestAnimationFrame(animateCursor);

    // Event listeners to handle custom hover states
    const addHoverEvents = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );

      interactives.forEach((el) => {
        el.addEventListener("mouseenter", (e) => {
          setHovered(true);
          const target = e.currentTarget as HTMLElement;
          const text = target.getAttribute("data-cursor-text");
          if (text) {
            setCursorText(text);
          }
        });

        el.addEventListener("mouseleave", () => {
          setHovered(false);
          setCursorText("");
        });
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Setup hover listeners initially
    addHoverEvents();

    // Re-bind hover listeners occasionally for dynamically added items
    const interval = setInterval(addHoverEvents, 2000);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrame);
      clearInterval(interval);
    };
  }, [visible]);

  if (typeof window === "undefined") return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-50 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Tiny inner tracking dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-cyber-teal rounded-full mix-blend-difference"
      />

      {/* Lagging interactive outer ring */}
      <div
        ref={outlineRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-cyber-purple mix-blend-difference flex items-center justify-center transition-all duration-300 ease-out ${
          hovered
            ? "w-14 h-14 -ml-7 -mt-7 bg-cyber-purple/20 border-cyber-teal scale-110"
            : ""
        }`}
      >
        {cursorText && (
          <span className="text-[9px] font-display font-bold tracking-widest text-cyber-teal uppercase animate-pulse">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
