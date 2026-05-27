"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Timeline" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Monitor scroll height to add full glass styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer to highlight current active section on scroll
  useEffect(() => {
    const observers = NAV_ITEMS.map((item) => {
      const el = document.getElementById(item.id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(item.id);
            }
          });
        },
        {
          rootMargin: "-25% 0px -55% 0px", // Trigger when section occupies the mid/upper viewport
        }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const handleNavClick = (id: string) => {
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] as const }}
        className={`fixed top-0 left-0 w-full z-40 px-6 py-4 md:py-6 transition-all duration-300 ${
          isScrolled ? "bg-obsidian/45 backdrop-blur-md border-b border-white/5 py-3 md:py-4" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo Branding */}
          <button
            onClick={() => handleNavClick("hero")}
            className="flex items-center gap-2 text-xl font-display font-black tracking-tighter text-white"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyber-purple to-cyber-teal flex items-center justify-center text-sm font-code text-obsidian shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              C
            </span>
            <span>CHARAN</span>
          </button>

          {/* Desktop Navigation Link Pill Menu */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.04] p-1.5 rounded-full backdrop-blur-xl relative">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredSection(item.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                  className={`relative px-4 py-1.5 text-xs font-display font-semibold tracking-wider uppercase rounded-full transition-colors duration-250 cursor-pointer ${
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {/* Sliding Hover Underlay pill */}
                  {isHovered && (
                    <motion.div
                      layoutId="navHover"
                      className="absolute inset-0 bg-white/5 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Active Highlight Underlay pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navActive"
                      className="absolute inset-0 bg-gradient-to-r from-cyber-purple/20 to-cyber-teal/20 border border-cyber-purple/35 rounded-full z-0 shadow-[0_0_8px_rgba(139,92,246,0.15)]"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Connect Action Button */}
          <div className="hidden md:block">
            <button
              onClick={() => handleNavClick("contact")}
              className="group flex items-center gap-2 bg-gradient-to-r from-cyber-purple to-cyber-teal text-obsidian px-5 py-2 rounded-full font-display font-bold text-xs tracking-wider uppercase transition-transform hover:scale-105 duration-250 shadow-[0_0_20px_rgba(13b,92,246,0.3)] cursor-pointer"
            >
              <span>Connect</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white backdrop-blur-md cursor-pointer"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-obsidian/95 backdrop-blur-2xl flex items-center justify-center md:hidden"
          >
            {/* Tech grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40" />

            <nav className="flex flex-col items-center gap-8">
              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ delay: idx * 0.08, ease: "easeOut" }}
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="group flex flex-col items-center cursor-pointer"
                  >
                    <span
                      className={`text-2xl font-display font-black tracking-wider uppercase transition-colors ${
                        isActive ? "text-cyber-teal" : "text-white group-hover:text-cyber-purple"
                      }`}
                    >
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className="w-8 h-[2px] bg-cyber-teal mt-2"
                      />
                    )}
                  </motion.button>
                );
              })}

              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.08 }}
                onClick={() => handleNavClick("contact")}
                className="mt-4 group flex items-center gap-2 bg-gradient-to-r from-cyber-purple to-cyber-teal text-obsidian px-8 py-3 rounded-full font-display font-black tracking-widest text-sm uppercase shadow-[0_0_20px_rgba(139,92,246,0.3)] cursor-pointer"
              >
                <span>Hire Me</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
