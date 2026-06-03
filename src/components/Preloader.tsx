"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // DNA Helix Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationId: number;
    let time = 0;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.02;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const helixRadius = Math.min(canvas.width * 0.15, 120);
      const helixHeight = Math.min(canvas.height * 0.6, 400);
      const numPoints = 30;

      // Draw connecting lines between strands
      for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints;
        const y = centerY - helixHeight / 2 + t * helixHeight;
        const angle = t * Math.PI * 4 + time * 2;

        const x1 = centerX + Math.cos(angle) * helixRadius;
        const x2 = centerX + Math.cos(angle + Math.PI) * helixRadius;
        const z1 = Math.sin(angle);
        const z2 = Math.sin(angle + Math.PI);

        // Connecting rungs
        if (i % 3 === 0) {
          const gradient = ctx.createLinearGradient(x1, y, x2, y);
          gradient.addColorStop(0, `rgba(139, 92, 246, ${0.15 + z1 * 0.1})`);
          gradient.addColorStop(1, `rgba(20, 184, 166, ${0.15 + z2 * 0.1})`);
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Strand 1 nodes
        const size1 = 3 + z1 * 2;
        const alpha1 = 0.4 + z1 * 0.4;
        ctx.beginPath();
        ctx.arc(x1, y, Math.max(size1, 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${Math.max(alpha1, 0.1)})`;
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(x1, y, Math.max(size1 * 3, 2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${Math.max(alpha1 * 0.15, 0.01)})`;
        ctx.fill();

        // Strand 2 nodes
        const size2 = 3 + z2 * 2;
        const alpha2 = 0.4 + z2 * 0.4;
        ctx.beginPath();
        ctx.arc(x2, y, Math.max(size2, 1), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${Math.max(alpha2, 0.1)})`;
        ctx.fill();
        // Glow
        ctx.beginPath();
        ctx.arc(x2, y, Math.max(size2 * 3, 2), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(20, 184, 166, ${Math.max(alpha2 * 0.15, 0.01)})`;
        ctx.fill();
      }

      // Floating particles
      if (Math.random() > 0.7) {
        particles.push({
          x: centerX + (Math.random() - 0.5) * helixRadius * 3,
          y: centerY + (Math.random() - 0.5) * helixHeight,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          life: 0,
          maxLife: 60 + Math.random() * 60,
        });
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        const alpha = 1 - p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.3})`;
        ctx.fill();
        if (p.life >= p.maxLife) particles.splice(i, 1);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Progress counter
  useEffect(() => {
    document.body.style.overflow = "hidden";

    const duration = 2500;
    const intervalTime = 20;
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      // Eased progress - starts fast, slows near end
      const linear = currentStep / totalSteps;
      const eased = 1 - Math.pow(1 - linear, 3);
      const progress = Math.min(Math.round(eased * 100), 100);
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = "";
          setTimeout(onComplete, 800);
        }, 400);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  const glitchText = "SRICHARAN";

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] as const }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian overflow-hidden"
        >
          {/* Dual Split Panels */}
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] as const, delay: 0.1 }}
            className="absolute top-0 left-0 w-full h-[50.5vh] bg-[#08080C] border-b border-white/5"
          />
          <motion.div
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] as const, delay: 0.1 }}
            className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-[#08080C] border-t border-white/5"
          />

          {/* DNA Helix Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 opacity-60"
          />

          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-50" />

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {/* Glitch Name */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6 relative"
            >
              <h2 className="text-sm font-code uppercase tracking-[0.3em] text-cyber-teal/70 mb-3">
                Initializing Portfolio
              </h2>
              <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-white relative preloader-glitch-text"
                data-text={glitchText}
              >
                {glitchText.split("").map((char, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    className="inline-block"
                    style={{
                      background: `linear-gradient(135deg, #ffffff ${100 - i * 10}%, #8b5cf6 ${100}%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </h1>
            </motion.div>

            {/* Circular progress ring */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="relative w-32 h-32 mb-6"
            >
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                {/* Background ring */}
                <circle
                  cx="60" cy="60" r="52"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* Progress ring */}
                <circle
                  cx="60" cy="60" r="52"
                  stroke="url(#progressGradient)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 52}`}
                  strokeDashoffset={`${2 * Math.PI * 52 * (1 - count / 100)}`}
                  style={{ transition: "stroke-dashoffset 0.1s ease" }}
                />
                {/* Glowing dot at progress tip */}
                <circle
                  cx={60 + 52 * Math.cos((2 * Math.PI * count / 100) - Math.PI / 2)}
                  cy={60 + 52 * Math.sin((2 * Math.PI * count / 100) - Math.PI / 2)}
                  r="4"
                  fill="#14b8a6"
                  style={{ filter: "drop-shadow(0 0 6px #14b8a6)" }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#14b8a6" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Center count */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-code font-black text-white">
                  {count}
                  <span className="text-sm text-cyber-teal/70">%</span>
                </span>
              </div>
            </motion.div>

            {/* Status line */}
            <div className="h-6 overflow-hidden">
              <motion.p
                key={Math.floor(count / 20)}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                className="text-[10px] font-code uppercase tracking-widest text-zinc-400"
              >
                {count < 20 && "Mapping neural pathways..."}
                {count >= 20 && count < 40 && "Sequencing project DNA..."}
                {count >= 40 && count < 60 && "Synthesizing experience strands..."}
                {count >= 60 && count < 80 && "Bonding skill molecules..."}
                {count >= 80 && count < 100 && "Crystallizing portfolio structure..."}
                {count >= 100 && "Genome compilation complete."}
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
