"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useRef } from "react";
import { Cpu, Code, Server, Database, Settings, Wifi, BookOpen, Users } from "lucide-react";

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  accentColor: string; // tailwind text color
  glowColor: string; // for bottom border glow
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core Programming",
    icon: <Code className="w-5 h-5" />,
    accentColor: "text-cyber-purple",
    glowColor: "from-cyber-purple/60 to-cyber-purple/0",
    skills: ["Java", "Data Structures", "Algorithms", "OOP Concepts", "Problem Solving", "C Programming"],
  },
  {
    title: "Web & Backend",
    icon: <Server className="w-5 h-5" />,
    accentColor: "text-cyber-teal",
    glowColor: "from-cyber-teal/60 to-cyber-teal/0",
    skills: ["Spring Boot", "Node.js", "Express.js", "Python Flask", "HTML", "CSS", "JavaScript", "React.js"],
  },
  {
    title: "Databases & Tools",
    icon: <Database className="w-5 h-5" />,
    accentColor: "text-cyber-blue",
    glowColor: "from-cyber-blue/60 to-cyber-blue/0",
    skills: ["MySQL", "DBMS Concepts", "Git", "GitHub", "Networking", "MongoDB"],
  },
  {
    title: "IoT & Hardware",
    icon: <Wifi className="w-5 h-5" />,
    accentColor: "text-cyber-teal",
    glowColor: "from-cyber-teal/60 to-cyber-teal/0",
    skills: ["ESP32", "Sensor Integration", "Real-time Monitoring", "Circuit Design", "Arduino"],
  },
  {
    title: "CS Fundamentals",
    icon: <BookOpen className="w-5 h-5" />,
    accentColor: "text-cyber-purple",
    glowColor: "from-cyber-purple/60 to-cyber-purple/0",
    skills: ["Operating Systems", "Computer Networks", "Software Engineering", "System Design"],
  },
  {
    title: "Soft Skills",
    icon: <Users className="w-5 h-5" />,
    accentColor: "text-cyber-pink",
    glowColor: "from-cyber-pink/60 to-cyber-pink/0",
    skills: ["Analytical Thinking", "Team Collaboration", "Quick Learning", "Attention to Detail"],
  },
];

// Interactive 3D tilt card
function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = (event.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (event.clientY - rect.top) / rect.height - 0.5;
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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative p-6 md:p-8 rounded-[1.5rem] glass-premium border border-white/[0.06] overflow-hidden group hover:border-white/10 transition-all duration-300"
    >
      {/* Bottom accent glow line */}
      <div className={`absolute bottom-0 left-[10%] right-[10%] h-[2px] bg-gradient-to-r ${category.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      {/* Corner tech label */}
      <div className="absolute top-3 right-4 text-[8px] font-code text-zinc-700 tracking-widest pointer-events-none uppercase">
        Module_0{index + 1}
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center ${category.accentColor} group-hover:shadow-lg transition-shadow duration-300`}>
          {category.icon}
        </div>
        <h3 className="font-display font-bold text-base md:text-lg text-white tracking-tight">
          {category.title}
        </h3>
      </div>

      {/* Skill Pills */}
      <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(20px)" }}>
        {category.skills.map((skill, skillIdx) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 + skillIdx * 0.04 }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-code tracking-wide border transition-all duration-300 cursor-default
              ${skillIdx < 2
                ? `bg-white/[0.04] border-white/10 text-zinc-300 hover:border-white/25 hover:bg-white/[0.07] hover:text-white`
                : `bg-white/[0.02] border-white/[0.06] text-zinc-500 hover:border-white/15 hover:bg-white/[0.04] hover:text-zinc-300`
              }`}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
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

        {/* 3-Column Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <SkillCard key={cat.title} category={cat} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
