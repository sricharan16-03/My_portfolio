"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Disable scrolling while loader is active
    document.body.style.overflow = "hidden";

    // Simulate high-tech system load
    const duration = 2000; // 2 seconds total load
    const intervalTime = 20; // tick every 20ms
    const totalSteps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setCount(progress);

      if (progress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsFinished(true);
          // Enable scrolling after transitions complete
          document.body.style.overflow = "";
          setTimeout(onComplete, 800); // Trigger completion callback
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] as const }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian overflow-hidden"
        >
          {/* Dual Split Panels (Futuristic shutter exit) */}
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

          {/* Scanning Tech Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-40" />

          {/* Scanning Laser Line */}
          <motion.div
            initial={{ top: 0 }}
            animate={{ top: "100%" }}
            transition={{ duration: 2, ease: "linear", repeat: Infinity }}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-teal to-transparent opacity-30 shadow-[0_0_15px_#14b8a6]"
          />

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center">
            {/* Branding Typography */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-8"
            >
              <h2 className="text-sm font-code uppercase tracking-[0.3em] text-cyber-purple mb-2">
                System Core Loading
              </h2>
              <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight gradient-text">
                CREATIVE ARCHITECT
              </h1>
            </motion.div>

            {/* Glowing Counter */}
            <div className="relative w-48 h-1 bg-white/5 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-cyber-purple to-cyber-teal"
                style={{ width: `${count}%` }}
              />
            </div>

            <motion.div
              key={count}
              initial={{ scale: 0.95, opacity: 0.7 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl md:text-6xl font-code font-black tracking-tighter text-white"
            >
              {count.toString().padStart(3, "0")}
              <span className="text-xl font-medium text-cyber-teal ml-1">%</span>
            </motion.div>

            {/* Dynamic Status Log */}
            <div className="mt-8 h-6 overflow-hidden">
              <motion.p
                key={Math.floor(count / 20)}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                className="text-[10px] font-code uppercase tracking-widest text-zinc-400"
              >
                {count < 20 && "Initializing 3D assets..."}
                {count >= 20 && count < 40 && "Loading WebGL nebulae..."}
                {count >= 40 && count < 60 && "Injecting GSAP scroll engines..."}
                {count >= 60 && count < 80 && "Assembling reactive layout mesh..."}
                {count >= 80 && count < 100 && "Optimizing UI viewport panels..."}
                {count >= 100 && "Core compiled successfully."}
              </motion.p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
