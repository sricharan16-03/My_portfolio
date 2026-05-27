"use client";

import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { Cpu, Layout, Server, Database, Settings } from "lucide-react";

interface SkillItem {
  name: string;
  level: number; // 0 to 100
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  colorClass: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: <Layout className="w-5 h-5" />,
    colorClass: "text-cyber-purple border-cyber-purple/20 shadow-cyber-purple/10",
    skills: [
      { name: "JavaScript / ES6", level: 92 },
      { name: "Java SE", level: 90 },
      { name: "Python (ML & Flask)", level: 88 },
      { name: "SQL (Structured Queries)", level: 85 },
      { name: "C Programming", level: 82 },
    ],
  },
  {
    title: "Web Technologies",
    icon: <Server className="w-5 h-5" />,
    colorClass: "text-cyber-teal border-cyber-teal/20 shadow-cyber-teal/10",
    skills: [
      { name: "HTML5 & CSS3 (Flexbox/Grid)", level: 95 },
      { name: "React.js Component Design", level: 90 },
      { name: "DOM Operations & Performance", level: 92 },
      { name: "Client-side Form Validation", level: 90 },
    ],
  },
  {
    title: "Databases & Back-End",
    icon: <Database className="w-5 h-5" />,
    colorClass: "text-cyber-blue border-cyber-blue/20 shadow-cyber-blue/10",
    skills: [
      { name: "MongoDB / Atlas Cloud", level: 88 },
      { name: "MySQL Server", level: 86 },
      { name: "Node.js Server Environment", level: 85 },
      { name: "Flask REST APIs", level: 80 },
    ],
  },
  {
    title: "Developer Tools & Soft Skills",
    icon: <Settings className="w-5 h-5" />,
    colorClass: "text-cyber-pink border-cyber-pink/20 shadow-cyber-pink/10",
    skills: [
      { name: "Git & GitHub Version Control", level: 92 },
      { name: "Vercel / GitHub Pages Hosting", level: 95 },
      { name: "Problem Solving & Logic", level: 92 },
      { name: "Team Collaboration", level: 95 },
      { name: "Attention to Detail", level: 90 },
    ],
  },
];

// Interactive 3D Card wrapper
function ThreeDCard({ children, colorClass }: { children: React.ReactNode; colorClass: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion values to track tilt angles
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Map mouse coordinates to degrees of rotation
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Relative position inside the card from -0.5 to 0.5
    const mouseX = (event.clientX - rect.left) / width - 0.5;
    const mouseY = (event.clientY - rect.top) / height - 0.5;
    
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`p-6 md:p-8 rounded-[1.75rem] glass-premium border shadow-xl relative overflow-hidden transition-shadow duration-300 hover:shadow-2xl ${colorClass}`}
    >
      {children}
    </motion.div>
  );
}

// Visual skill gauge bar
function ProgressGauge({ name, level }: SkillItem) {
  const barRef = useRef<HTMLDivElement>(null);
  const isView = useInView(barRef, { once: true, margin: "-50px" });

  return (
    <div ref={barRef} className="flex flex-col gap-2 w-full font-display">
      <div className="flex justify-between text-xs font-semibold">
        <span className="text-zinc-300">{name}</span>
        <span className="text-zinc-500 font-code">{level}%</span>
      </div>
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          className="h-full bg-gradient-to-r from-cyber-purple to-cyber-teal rounded-full"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 w-full px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Dynamic glow vectors */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-cyber-teal/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyber-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 bg-cyber-teal/10 border border-cyber-teal/20 rounded-full mb-4"
          >
            <Cpu className="w-3.5 h-3.5 text-cyber-teal" />
            <span className="text-[10px] font-code uppercase tracking-widest text-cyber-teal">
              02 // Technology Matrix
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase"
          >
            My Tech <span className="gradient-text">Ecosystem</span>
          </motion.h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <ThreeDCard colorClass={cat.colorClass}>
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white shadow-inner">
                    {cat.icon}
                  </div>
                  <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
                    {cat.title}
                  </h3>
                </div>

                {/* Progress Gauges Grid */}
                <div className="flex flex-col gap-5 relative z-10" style={{ transform: "translateZ(30px)" }}>
                  {cat.skills.map((skill) => (
                    <ProgressGauge key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>

                {/* Cyber tech grid corner detailing */}
                <div className="absolute top-3 right-3 text-[8px] font-code text-zinc-700 tracking-widest pointer-events-none uppercase">
                  Sys_x0{idx + 1}
                </div>
              </ThreeDCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
