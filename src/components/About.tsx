"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Terminal, Code } from "lucide-react";

// Helper component for counting animations
function StatCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const duration = 1500; // ms
    const increment = end / (duration / 16); // ~60fps refresh rate

    let animationFrameId: number;

    const updateCount = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
      } else {
        setCount(Math.floor(start));
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    updateCount();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-code font-black tracking-tight text-white">
      {count}
      <span className="text-cyber-teal font-display">{suffix}</span>
    </span>
  );
}

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="about" className="relative py-24 md:py-32 w-full px-6 md:px-12 lg:px-24 bg-black/40 overflow-hidden">
      {/* Background Vector Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyber-purple/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyber-teal/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 bg-cyber-purple/10 border border-cyber-purple/20 rounded-full mb-4"
          >
            <Terminal className="w-3.5 h-3.5 text-cyber-purple" />
            <span className="text-[10px] font-code uppercase tracking-widest text-cyber-purple">
              01 // Profile Summary
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase"
          >
            Decoding My <span className="gradient-text">Architecture</span>
          </motion.h2>
        </div>

        {/* Narrative Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left Column Story */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-zinc-400 font-display text-sm md:text-base leading-relaxed">
            <motion.div variants={itemVariants} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-cyber-teal" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-2 uppercase text-xs font-code tracking-[0.15em]">
                  The Creative Ideation
                </h3>
                <p>
                  I am a passionate software developer who looks at standard frontend coding structures as interactive artwork. I love taking complex, data-heavy systems and expressing them through intuitive, beautifully orchestrated visual components that tell a story.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 mt-1">
                <Code className="w-4 h-4 text-cyber-purple" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-2 uppercase text-xs font-code tracking-[0.15em]">
                  Responsive Frontend Engineering
                </h3>
                <p>
                  Anchored in responsive design standards, my core workflow is focused on optimizing DOM performance, creating cross-browser compatible interfaces, and debugging UI structures. I configure systems that load rapidly and run flawlessly.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-6 rounded-[1.25rem] border border-cyber-purple/20 bg-cyber-purple/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-cyber-purple opacity-20 select-none font-code text-5xl font-black">
                &lt;/&gt;
              </div>
              <p className="text-white/80 font-semibold italic relative z-10 leading-relaxed text-sm">
                &ldquo;Simplicity is the ultimate sophistication. I believe that every line of code should have a purpose, and every micro-interaction should add value, not distraction.&rdquo;
              </p>
            </motion.div>
          </div>

          {/* Right Column Stats Cards */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl glass-premium border border-white/5 flex flex-col justify-between h-40 shadow-lg relative group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center mb-4 text-cyber-purple group-hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all">
                <Terminal className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <StatCounter target={5} suffix="+" />
                <span className="text-[10px] font-code uppercase tracking-widest text-zinc-500 mt-1">
                  Completed Projects
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl glass-premium border border-white/5 flex flex-col justify-between h-40 shadow-lg relative group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyber-teal/10 border border-cyber-teal/20 flex items-center justify-center mb-4 text-cyber-teal group-hover:shadow-[0_0_15px_rgba(20,184,166,0.2)] transition-all">
                <Code className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <StatCounter target={90} suffix="+" />
                <span className="text-[10px] font-code uppercase tracking-widest text-zinc-500 mt-1">
                  LeetCode Problems Solved
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 rounded-2xl glass-premium border border-white/5 flex flex-col justify-between h-40 shadow-lg relative group sm:col-span-2"
            >
              <div className="w-10 h-10 rounded-lg bg-cyber-pink/10 border border-cyber-pink/20 flex items-center justify-center mb-4 text-cyber-pink group-hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <StatCounter target={100} suffix="%" />
                <span className="text-[10px] font-code uppercase tracking-widest text-zinc-500 mt-1">
                  Satisfaction & Accuracy Rate
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
