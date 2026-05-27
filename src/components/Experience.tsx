"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Calendar, Briefcase, Award, GraduationCap } from "lucide-react";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  tags: string[];
  icon: React.ReactNode;
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    role: "Front-End Web Developer Intern",
    company: "Edunet Foundation (Hyderabad, India)",
    period: "August 2025 – September 2025",
    description: [
      "Developed highly responsive, fluid frontend interfaces using HTML5, CSS3, and modern JavaScript standards, enhancing accessibility.",
      "Optimized DOM operations to increase performance, decrease visual lag, and ensure cross-browser compatibility across Chrome, Firefox, and Edge.",
      "Configured robust client-side form validations and resolved frontend UI alignment anomalies using browser developer inspector suites.",
    ],
    tags: ["HTML5 / CSS3", "JavaScript", "DOM Optimization", "Form Validation", "UI Debugging"],
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    role: "Web Development Intern",
    company: "VaultofCodes (Remote)",
    period: "July 2025 – August 2025",
    description: [
      "Successfully executed a intensive 1-month development agenda completing modern frontend enhancements for diverse project viewports.",
      "Developed and modified responsive, accessible web layouts adhering to contemporary usability standards and responsive designs.",
      "Collaborated with project leads on debugging, improving frontend web performance, and integrating responsive mobile scaling behaviors.",
    ],
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Collaborative Workflows"],
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    role: "Bachelor of Technology (B.Tech) - CSE",
    company: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute of Science and Technology (Chennai)",
    period: "Sept 2023 – July 2027",
    description: [
      "Pursuing specialized curriculum in Computer Science and Engineering, maintaining strong academic excellence.",
      "Relevant Coursework: Data Structures & Algorithms, Database Management Systems, Operating Systems, Computer Networks.",
    ],
    tags: ["Computer Science", "Data Structures", "Algorithms", "DBMS", "Operating Systems", "Computer Networks"],
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    role: "Intermediate – MPC",
    company: "Sri Chaitanya Junior College (Hyderabad)",
    period: "2021 – 2023",
    description: [
      "Completed Intermediate certification in Mathematics, Physics, and Chemistry (MPC) with stellar grades.",
    ],
    tags: ["Mathematics", "Physics", "Chemistry", "Logical Reasoning"],
    icon: <GraduationCap className="w-4 h-4" />,
  },
];

// Stagger card reveals
function TimelineCard({ item, index }: { item: ExperienceItem; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
      className={`relative flex flex-col md:flex-row w-full mb-16 ${
        isEven ? "md:justify-start" : "md:justify-end"
      }`}
    >
      {/* Centered Node Connector */}
      <div className="absolute left-4 md:left-1/2 top-6 w-8 h-8 rounded-full border border-cyber-teal bg-obsidian flex items-center justify-center -translate-x-4 md:-translate-x-4 z-10 text-cyber-teal shadow-[0_0_12px_rgba(20,184,166,0.3)] transition-transform hover:scale-110">
        {item.icon}
      </div>

      {/* Card Content Panel */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:pr-8 text-left" : "md:pl-8 text-left"}`}>
        <div className="p-6 md:p-8 rounded-[1.75rem] border border-white/5 glass-premium shadow-xl hover:border-cyber-purple/20 transition-all duration-300 relative group">
          {/* Laser trace highlight */}
          <div className="absolute top-0 left-6 w-20 h-[2px] bg-gradient-to-r from-cyber-purple to-cyber-teal opacity-30 shadow-md group-hover:w-36 transition-all duration-500" />

          {/* Timeframe block */}
          <div className="inline-flex items-center gap-1.5 text-xs font-code text-cyber-teal mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>{item.period}</span>
          </div>

          <h3 className="text-xl font-display font-black tracking-tight text-white mb-1">
            {item.role}
          </h3>

          <h4 className="text-sm font-code text-zinc-400 font-medium mb-4">
            {item.company}
          </h4>

          {/* Bullet achievements */}
          <ul className="text-zinc-400 font-display text-xs md:text-sm leading-relaxed mb-6 space-y-2.5 list-disc list-outside pl-4">
            {item.description.map((bullet, bIdx) => (
              <li key={bIdx} className="marker:text-cyber-purple">
                {bullet}
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/5 text-[9px] font-code text-zinc-400 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside timeline section to sync glowing line scale
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  // Smooth scale indicator for vertical timeline tracer
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 md:py-32 w-full px-6 md:px-12 lg:px-24 bg-black/40 overflow-hidden"
    >
      {/* Background vector glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyber-purple/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 bg-cyber-purple/10 border border-cyber-purple/20 rounded-full mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyber-purple" />
            <span className="text-[10px] font-code uppercase tracking-widest text-cyber-purple">
              04 // Professional Timeline
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase"
          >
            My Journey <span className="gradient-text">Log</span>
          </motion.h2>
        </div>

        {/* Timeline Row container */}
        <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
          
          {/* Static Background Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[1px] bg-white/5 -translate-x-[0.5px]" />

          {/* Dynamic Scroll-Linked Glowing Neon Tracer */}
          <motion.div
            style={{
              scaleY,
              transformOrigin: "top",
            }}
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-cyber-purple via-cyber-teal to-cyber-pink -translate-x-[1px] shadow-[0_0_10px_#8b5cf6]"
          />

          {/* Chronological card listings */}
          <div className="w-full relative z-10">
            {EXPERIENCE_DATA.map((item, idx) => (
              <TimelineCard key={`${item.company}-${item.period}`} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
