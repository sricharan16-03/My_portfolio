"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Terminal, Code, User, Cpu, Coffee } from "lucide-react";

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

        {/* ═══════════════ ABOUT ME SECTION ═══════════════ */}
        <div className="mb-24 md:mb-32">
          {/* About Me Title */}
          <div className="flex flex-col items-center text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 px-3 py-1 bg-cyber-teal/10 border border-cyber-teal/20 rounded-full mb-4"
            >
              <User className="w-3.5 h-3.5 text-cyber-teal" />
              <span className="text-[10px] font-code uppercase tracking-widest text-cyber-teal">
                00 // Who I Am
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase"
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>
          </div>

          {/* About Me Content Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative p-8 md:p-12 rounded-[2rem] glass-premium border border-white/5 overflow-hidden group">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyber-purple/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyber-teal/10 to-transparent rounded-full blur-[80px] pointer-events-none" />
              
              {/* Corner brackets */}
              <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-cyber-teal/30 pointer-events-none" />
              <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-cyber-purple/30 pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-cyber-purple/30 pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-cyber-teal/30 pointer-events-none" />

              <div className="relative z-10">
                {/* Greeting line */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyber-purple/20 to-cyber-teal/20 border border-white/10 flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-cyber-teal" />
                  </div>
                  <div>
                    <h3 className="text-white font-display font-bold text-lg md:text-xl">
                      Hey, I&apos;m <span className="gradient-text">Sricharan</span> 👋
                    </h3>
                    <p className="text-[10px] font-code uppercase tracking-widest text-zinc-500">
                      CSE Undergraduate • Builder • Problem Solver
                    </p>
                  </div>
                </div>

                {/* Bio paragraphs */}
                <div className="space-y-4 text-zinc-400 font-display text-sm md:text-base leading-relaxed">
                  <p>
                    I&apos;m a <span className="text-white font-semibold">Computer Science Engineering</span> student with a deep passion for turning ideas into impactful digital solutions. Whether it&apos;s architecting robust backends in <span className="text-cyber-purple font-semibold">Java</span>, crafting pixel-perfect frontend interfaces, or engineering smart <span className="text-cyber-teal font-semibold">IoT systems</span> that bridge the physical and digital worlds — I thrive at the intersection of creativity and technology.
                  </p>
                  <p>
                    From competitive problem-solving on <span className="text-white font-semibold">LeetCode</span> to deploying full-stack web applications and building real-time hardware prototypes, I enjoy building technology that is <span className="text-cyber-teal font-semibold">practical</span>, <span className="text-cyber-purple font-semibold">efficient</span>, and <span className="text-white font-semibold">meaningful</span>. Every project I take on is driven by a desire to create solutions that genuinely make a difference.
                  </p>
                </div>

                {/* Quick highlights */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {["Java Development", "Web Applications", "IoT Systems", "Problem Solving", "Machine Learning", "Full-Stack"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-code text-zinc-400 uppercase tracking-wider hover:border-cyber-teal/30 hover:text-cyber-teal transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══════════════ DECODING MY ARCHITECTURE ═══════════════ */}
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
                <Coffee className="w-4 h-4 text-cyber-teal" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-2 uppercase text-xs font-code tracking-[0.15em]">
                  Java Developer
                </h3>
                <p>
                  Proficient in Core Java with a strong foundation in object-oriented programming, data structures, and algorithms. I build scalable, clean, and efficient backend solutions, leveraging Java&apos;s ecosystem to create robust applications that solve real-world problems.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 mt-1">
                <Code className="w-4 h-4 text-cyber-purple" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-2 uppercase text-xs font-code tracking-[0.15em]">
                  Full-Stack Web Engineering
                </h3>
                <p>
                  Anchored in responsive design standards, my core workflow spans from crafting intuitive frontends with React.js and Next.js to building RESTful APIs with Node.js and Express. I configure systems that load rapidly, run flawlessly, and scale effortlessly.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-center shrink-0 mt-1">
                <Cpu className="w-4 h-4 text-cyber-pink" />
              </div>
              <div>
                <h3 className="text-white font-bold tracking-wide mb-2 uppercase text-xs font-code tracking-[0.15em]">
                  IoT & Embedded Systems
                </h3>
                <p>
                  Passionate about bridging the physical and digital worlds through IoT solutions. From air pollution monitoring systems to smart gas leakage detection with auto-shutoff mechanisms, I design sensor-driven architectures using Arduino and ESP microcontrollers that deliver real-time, life-saving intelligence.
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
