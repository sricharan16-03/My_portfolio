"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, ChevronDown, Download, Mail, MapPin } from "lucide-react";

const GithubIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const LeetCodeIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.375a1.25 1.25 0 010-1.807l4.51-4.375c.466-.451 1.211-.451 1.677 0l2.69 2.607c.466.452.466 1.184 0 1.637l-2.69 2.606c-.466.452-1.211.452-1.677 0l-1.012-.981a.584.584 0 010-.818l1.012-.981a.584.584 0 01.838 0l1.013.98c.156.15.404.15.56 0l1.012-.98a.584.584 0 010-.818l-3.376-3.272a2.336 2.336 0 00-3.354 0l-4.51 4.375a2.5 2.5 0 000 3.614l4.51 4.375a2.336 2.336 0 003.354 0l3.376-3.272a.584.584 0 01.838 0z" />
  </svg>
);

export default function Hero() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const frameRef = useRef<HTMLDivElement>(null);

  // Parallax tracking relative to viewport center
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setCoords({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center pt-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.03),transparent_60%)] pointer-events-none z-0" />

      {/* NEXT-LEVEL SCROLLING MARQUEE TEXT BEHIND IMAGE */}
      <div className="absolute inset-0 flex flex-col justify-center overflow-hidden pointer-events-none select-none z-0 opacity-40">
        <div className="overflow-hidden flex w-full">
          <div className="animate-marquee-left flex gap-12 whitespace-nowrap text-[13vw] font-display font-black tracking-tighter text-white/[0.015] uppercase leading-none select-none">
            <span>CH SRICHARAN // WEB DEVELOPER // CREATIVE CODING // </span>
            <span>CH SRICHARAN // WEB DEVELOPER // CREATIVE CODING // </span>
          </div>
        </div>
        <div className="overflow-hidden flex w-full mt-4">
          <div className="animate-marquee-right flex gap-12 whitespace-nowrap text-[13vw] font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyber-purple/5 to-cyber-teal/5 uppercase leading-none select-none">
            <span>PORTFOLIO // HYDERABAD // ACTIVE INTERN // </span>
            <span>PORTFOLIO // HYDERABAD // ACTIVE INTERN // </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl w-full flex flex-col items-center justify-center relative z-10">
        
        {/* CENTERED PORTRAIT FRAME */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
          className="relative w-64 h-80 md:w-76 md:h-[400px] flex items-center justify-center z-20 mb-8 lg:mb-0"
          style={{
            perspective: 1000,
          }}
        >
          {/* Background Parallax Neon Glow Box */}
          <div
            className="absolute -inset-4 bg-gradient-to-tr from-cyber-purple/20 via-transparent to-cyber-teal/20 rounded-[2.5rem] blur-2xl opacity-60 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${coords.x * 20}px, ${coords.y * 20}px, 0) rotateX(${-coords.y * 10}deg) rotateY(${coords.x * 10}deg)`,
            }}
          />

          {/* Main Interactive Portrait Frame */}
          <div
            ref={frameRef}
            className="relative w-full h-full rounded-[2rem] border border-white/10 glass-premium overflow-hidden transition-transform duration-300 ease-out shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
            style={{
              transform: `translate3d(${coords.x * -15}px, ${coords.y * -15}px, 0) rotateX(${-coords.y * 8}deg) rotateY(${coords.x * 8}deg)`,
            }}
          >
            {/* Ambient shader glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent z-10 pointer-events-none" />

            {/* Profile Image with cyber scale */}
            <img
              src="/profile.jpg"
              alt="CH Sricharan Portrait"
              className="absolute inset-0 w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-out z-0 filter brightness-95 contrast-105"
            />

            {/* Tech grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40 z-10" />
            
            {/* Scanlines & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/85 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-25 z-10" />

            {/* Glowing rings HUD */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between">
              <div className="flex flex-col backdrop-blur-md bg-black/45 border border-white/10 px-3 py-1.5 rounded-xl">
                <span className="text-[9px] font-code text-cyber-teal uppercase tracking-widest font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal animate-ping" />
                  SYSTEM ACTIVE
                </span>
                <span className="text-[8px] font-code text-zinc-400 mt-0.5 uppercase tracking-wider">PORTFOLIO // V1.0</span>
              </div>
              <div className="w-8 h-8 rounded-full border border-cyber-pink/35 flex items-center justify-center backdrop-blur-md bg-black/45 animate-spin-slow">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-pink" />
              </div>
            </div>

            {/* Laser sweep scanner */}
            <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-teal to-transparent opacity-85 shadow-[0_0_12px_#14b8a6] z-15 pointer-events-none animate-scan" style={{ top: 0 }} />
          </div>

          {/* Glowing Corners */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyber-teal/50 pointer-events-none z-20" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-cyber-purple/50 pointer-events-none z-20" />
        </motion.div>

        {/* FLOATING CORNER DETAILS */}
        <div className="w-full flex flex-col gap-6 mt-6 lg:mt-0 lg:absolute lg:inset-0 lg:h-full lg:w-full lg:justify-between lg:p-0 lg:pointer-events-none">
          
          {/* TOP SECTION */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:w-full lg:items-start gap-6 lg:gap-0 pointer-events-auto">
            {/* Top Left - Sricharan Bio & Location */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col gap-2 max-w-sm pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-teal animate-pulse shadow-[0_0_8px_#14b8a6]" />
                <span className="text-[9px] font-code uppercase tracking-widest text-zinc-400">
                  Open to Internships & Roles
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white mt-2 leading-[1.1]">
                CH SRICHARAN
              </h1>
              <div className="flex items-center gap-1.5 text-zinc-400 font-code text-[11px] tracking-wider uppercase mt-1">
                <MapPin className="w-3.5 h-3.5 text-cyber-purple animate-bounce" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </motion.div>

            {/* Top Right - University Detail */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col gap-2 max-w-sm lg:text-right text-left font-display border-l lg:border-l-0 lg:border-r border-white/10 pl-4 lg:pl-0 lg:pr-4 pointer-events-auto"
            >
              <span className="text-[10px] font-code uppercase tracking-widest text-cyber-purple">
                EDUCATION // VEL TECH UNIVERSITY
              </span>
              <p className="text-white text-xs md:text-sm font-bold leading-relaxed max-w-[280px] lg:ml-auto">
                B.Tech in Computer Science & Engineering
              </p>
              <span className="text-zinc-500 font-code text-[10px] uppercase tracking-wider">
                Graduation Sept 2023 - July 2027
              </span>
            </motion.div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:w-full lg:items-end gap-6 lg:gap-0 pointer-events-auto mt-4 lg:mt-0">
            {/* Bottom Left - Core System Identity Statement */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="flex flex-col gap-3 max-w-md border-l border-white/10 pl-4 pointer-events-auto"
            >
              <span className="text-[10px] font-code uppercase tracking-widest text-cyber-teal">
                CORE ARCHITECTURE
              </span>
              <p className="text-zinc-400 text-xs md:text-sm leading-relaxed font-display">
                Creative frontend software intern specialized in crafting clean responsive layouts, optimizing DOM operations, and blending robust APIs with sleek visuals.
              </p>
            </motion.div>

            {/* Bottom Right - Action Trigger CTAs & Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col gap-4 items-start lg:items-end w-full lg:w-auto font-display pointer-events-auto"
            >
              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={() => handleScrollTo("projects")}
                  className="group flex items-center justify-center gap-2 bg-white text-obsidian font-bold text-[10px] tracking-wider uppercase px-5 py-3.5 rounded-full hover:bg-cyber-teal hover:text-obsidian hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all duration-300 cursor-pointer w-full sm:w-auto"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => handleScrollTo("contact")}
                  className="flex items-center justify-center gap-2 bg-white/[0.04] border border-white/10 hover:border-cyber-purple/40 text-white font-semibold text-[10px] tracking-wider uppercase px-5 py-3.5 rounded-full hover:bg-cyber-purple/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)] transition-all duration-300 cursor-pointer w-full sm:w-auto"
                >
                  <Mail className="w-3.5 h-3.5 text-cyber-purple" />
                  <span>Connect Me</span>
                </button>
                <a
                  href="/Sricharan_resume_java.pdf"
                  download="Sricharan_resume_java.pdf"
                  className="flex items-center justify-center gap-2 bg-white/[0.04] border border-white/10 hover:border-cyber-teal/40 text-white font-semibold text-[10px] tracking-wider uppercase px-5 py-3.5 rounded-full hover:bg-cyber-teal/10 hover:shadow-[0_0_15px_rgba(20,184,166,0.15)] transition-all duration-300 cursor-pointer w-full sm:w-auto"
                >
                  <Download className="w-3.5 h-3.5 text-cyber-teal" />
                  <span>Download Resume</span>
                </a>
              </div>

              {/* Social Channels Pill Grid */}
              <div className="flex items-center gap-4 mt-2 font-code text-[11px] text-zinc-500">
                <a
                  href="https://github.com/sricharan16-03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyber-teal flex items-center gap-1 uppercase transition-colors"
                >
                  <GithubIcon />
                  <span>GitHub</span>
                </a>
                <span>{"//"}</span>
                <a
                  href="https://www.linkedin.com/in/ch-sricharan-0528b6396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyber-purple flex items-center gap-1 uppercase transition-colors"
                >
                  <LinkedinIcon />
                  <span>LinkedIn</span>
                </a>
                <span>{"//"}</span>
                <a
                  href="https://leetcode.com/u/Sricharan_ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cyber-pink flex items-center gap-1.5 uppercase transition-colors"
                >
                  <LeetCodeIcon />
                  <span>LeetCode</span>
                </a>
              </div>
            </motion.div>
          </div>

        </div>

      </div>

      {/* Down Scroll Indicator Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        onClick={() => handleScrollTo("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer group z-20 mt-8 lg:mt-0"
      >
        <span className="text-[9px] font-code uppercase tracking-widest text-zinc-500 group-hover:text-cyber-teal transition-colors">
          Scroll Down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-zinc-700 rounded-full flex justify-center p-1"
        >
          <div className="w-1 h-1.5 bg-cyber-teal rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
