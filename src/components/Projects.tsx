"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Monitor, Layers, ArrowUpRight } from "lucide-react";

interface ProjectItem {
  id: string;
  num: string;
  title: string;
  description: string;
  techs: string[];
  liveLink: string;
  gitLink: string;
  themeColor: string; // Tailwind gradient background
  accentColor: string; // Tailwind hex color glow
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "idas-assistance",
    num: "01",
    title: "INTELLIGENT DRIVER ASSISTANCE SYSTEM",
    description: "Built a high-performance real-time visual dashboard for driver alerts, system monitoring, and threat detection. Designed highly responsive frontend controls using advanced Flexbox & Grid layouts and connected to MongoDB Atlas cloud database for real-time telemetry caching.",
    techs: ["React.js", "Node.js", "MongoDB Atlas", "CSS3 Grid/Flexbox"],
    liveLink: "https://github.com/sricharan16-03/idas",
    gitLink: "https://github.com/sricharan16-03/idas",
    themeColor: "from-cyber-purple/20 via-obsidian/45 to-[#1c0836]/15",
    accentColor: "rgba(139, 92, 246, 0.45)",
  },
  {
    id: "crop-recommender",
    num: "02",
    title: "AGRI ASSISTANT (CROP RECOMMENDER)",
    description: "Developed an elegant, responsive frontend interface for data visualization and agricultural prediction. Powered by a high-accuracy machine learning model hosted over Flask REST APIs and fully deployed to Vercel for high-speed edge distribution.",
    techs: ["Python", "Flask", "React.js / HTML5", "Machine Learning", "Vercel"],
    liveLink: "https://agriculture-assistant.vercel.app/",
    gitLink: "https://github.com/sricharan16-03/agri-assistant",
    themeColor: "from-cyber-teal/20 via-obsidian/45 to-[#052b27]/15",
    accentColor: "rgba(20, 184, 166, 0.45)",
  },
  {
    id: "job-portal",
    num: "03",
    title: "JOB PORTAL MANAGEMENT SYSTEM",
    description: "Designed and engineered a full-stack Job Portal Management System with secure recruiter/candidate pipelines. Implemented granular dashboard authorization filters, profile/resume processing channels, and dynamic job posting listings connected to MongoDB Atlas.",
    techs: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    liveLink: "https://github.com/sricharan16-03/Job_portal_management_system",
    gitLink: "https://github.com/sricharan16-03/Job_portal_management_system",
    themeColor: "from-cyber-pink/20 via-obsidian/45 to-[#380424]/15",
    accentColor: "rgba(236, 72, 153, 0.45)",
  },
  {
    id: "personal-portfolio",
    num: "04",
    title: "CREATIVE PORTFOLIO WEBPAGE",
    description: "Architected a fully responsive, custom-crafted portfolio website demonstrating high-end typography, glassmorphic HUD frames, interactive 3D parallax elements, and continuous text marquee scrolling. Built using Next.js, Three.js (WebGL), and Framer Motion.",
    techs: ["Next.js", "Three.js", "Framer Motion", "Tailwind CSS", "Lenis"],
    liveLink: "#hero",
    gitLink: "https://github.com/sricharan16-03",
    themeColor: "from-cyber-blue/20 via-obsidian/45 to-[#0b214a]/15",
    accentColor: "rgba(59, 130, 246, 0.45)",
  },
];

// Interactive 3D Card component for Projects
function Project3DCard({ proj }: { proj: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
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
        backgroundImage: `radial-gradient(circle at 100% 100%, ${proj.accentColor} 0%, rgba(5,5,8,0) 50%)`,
      }}
      className="w-full h-full rounded-[2rem] border border-white/5 bg-gradient-to-br p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:shadow-2xl"
    >
      {/* Micro tech code decoration */}
      <div className="absolute top-6 right-8 font-code text-[9px] text-zinc-600 tracking-wider">
        SYS_STATUS // COMPILED_OK
      </div>

      {/* Big numeric background indicator */}
      <div className="absolute -bottom-8 -right-8 font-display font-black text-[10rem] text-white/[0.012] leading-none select-none group-hover:text-white/[0.025] transition-colors duration-300 pointer-events-none">
        {proj.num}
      </div>

      <div className="z-10" style={{ transform: "translateZ(20px)" }}>
        {/* Top line with tech icons */}
        <div className="flex items-center gap-2 text-cyber-teal mb-4 text-[10px] font-code tracking-widest uppercase">
          <Monitor className="w-3.5 h-3.5 text-cyber-teal" />
          <span>PORTFOLIO_CORE_V{proj.num}</span>
        </div>

        <h3 className="text-xl md:text-2xl font-display font-black tracking-tight text-white mb-4 group-hover:text-cyber-teal transition-colors">
          {proj.title}
        </h3>

        <p className="text-zinc-400 font-display text-xs md:text-sm leading-relaxed max-w-xl">
          {proj.description}
        </p>
      </div>

      {/* Technical pills and repository links */}
      <div className="z-10 flex flex-col gap-6 mt-6" style={{ transform: "translateZ(30px)" }}>
        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {proj.techs.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-[9px] font-code text-zinc-400 uppercase"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions links */}
        <div className="flex items-center gap-4">
          {proj.liveLink.startsWith("#") ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(proj.liveLink.substring(1));
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-obsidian font-display font-bold text-xs tracking-wider uppercase transition-colors hover:bg-cyber-teal hover:text-obsidian hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] cursor-pointer"
            >
              <span>Preview Site</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          ) : (
            <a
              href={proj.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn flex items-center gap-1.5 px-4.5 py-2 rounded-full bg-white text-obsidian font-display font-bold text-xs tracking-wider uppercase transition-colors hover:bg-cyber-teal hover:text-obsidian hover:shadow-[0_0_15px_rgba(20,184,166,0.3)]"
            >
              <span>Launch App</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          )}

          <a
            href={proj.gitLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 text-white font-display font-semibold text-xs tracking-wider uppercase hover:border-white/40 hover:bg-white/5 transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span>Codebase</span>
          </a>
        </div>
      </div>

      {/* Cyberpunk corner brackets */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10 group-hover:border-cyber-teal/30 transition-colors pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10 group-hover:border-cyber-teal/30 transition-colors pointer-events-none" />
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 w-full px-6 md:px-12 lg:px-24 bg-black/40 overflow-hidden">
      {/* Background vector glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyber-pink/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyber-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section title container */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-2 px-3 py-1 bg-cyber-pink/10 border border-cyber-pink/20 rounded-full mb-4 w-fit">
            <Layers className="w-3.5 h-3.5 text-cyber-pink" />
            <span className="text-[10px] font-code uppercase tracking-widest text-cyber-pink">
              03 // Engineering Feats
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase">
            Featured <span className="gradient-text">Productions</span>
          </h2>
        </div>

        {/* 2x2 Grid of 3D Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full">
          {PROJECTS_DATA.map((proj, idx) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
            >
              <Project3DCard proj={proj} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
