"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Mail, Send, ArrowUpRight, CheckCircle2, AlertTriangle, FileDown } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors: FormErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Architect name is required.";
    
    if (!formData.email.trim()) {
      tempErrors.email = "Communication node (email) is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Please enter a valid routing email address.";
    }
    
    if (!formData.message.trim()) tempErrors.message = "Project brief description is required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear individual error on type
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate high-tech API processing
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Trigger a brilliant dual-burst confetti blast to celebrate contact!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#8b5cf6", "#14b8a6", "#ec4899"],
      });

      // Construct and trigger mailto client transmission
      const subject = encodeURIComponent(`Portfolio Node Connection from ${formData.name}`);
      const body = encodeURIComponent(
        `Hello Sricharan,\n\nYou have received a new contact submission from your portfolio website.\n\n` +
        `-----------------------------------------\n` +
        `SENDER DETAILS:\n` +
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `-----------------------------------------\n\n` +
        `MESSAGE BODY:\n` +
        `${formData.message}\n\n` +
        `-----------------------------------------\n` +
        `Sent via Charan's Creative Portfolio System.`
      );
      
      const mailtoUrl = `mailto:chsricharan25@gmail.com?subject=${subject}&body=${body}`;
      
      // Launch mail client
      window.location.href = mailtoUrl;

      // Reset form after a small delay
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSuccess(false);
      }, 5000);
    }, 1800);
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 w-full px-6 md:px-12 lg:px-24 bg-gradient-to-b from-black/40 to-obsidian overflow-hidden"
    >
      {/* Background neon mesh glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 bg-cyber-pink/10 border border-cyber-pink/20 rounded-full mb-4"
          >
            <Mail className="w-3.5 h-3.5 text-cyber-pink" />
            <span className="text-[10px] font-code uppercase tracking-widest text-cyber-pink">
              05 // Comm Terminal
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-black tracking-tight text-white uppercase"
          >
            Initiate <span className="gradient-text">Connection</span>
          </motion.h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Direct Channels Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="font-display">
              <h3 className="text-xl font-black text-white uppercase mb-4 tracking-wide">
                Collaborative Ideation
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Looking to elevate your engineering roster, build a high-performance responsive frontend web system, or debug complex UI flows? Let&apos;s build the future together.
              </p>
            </div>

            {/* Direct Channel Details */}
            <div className="flex flex-col gap-3.5 font-code text-xs">
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-cyber-teal font-bold uppercase tracking-widest w-16">EMAIL //</span>
                <a href="mailto:chsricharan25@gmail.com" className="text-zinc-300 hover:text-white transition-colors">
                  chsricharan25@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-cyber-purple font-bold uppercase tracking-widest w-16">PHONE //</span>
                <a href="tel:+91-7997083972" className="text-zinc-300 hover:text-white transition-colors">
                  +91 79970 83972
                </a>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-cyber-pink font-bold uppercase tracking-widest w-16">LOC //</span>
                <span className="text-zinc-300">Hyderabad, Telangana, India</span>
              </div>
            </div>

            {/* Resume action button */}
            <div className="p-5 rounded-2xl glass border border-white/5 flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-cyber-purple/10 border border-cyber-purple/20 flex items-center justify-center text-cyber-purple">
                  <FileDown className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-code uppercase tracking-widest text-zinc-300">
                    Resume Core Dossier
                  </h4>
                  <span className="text-[10px] text-zinc-500 font-display">PDF format // 142 KB</span>
                </div>
              </div>
              <a
                href="/Sricharan_resume_java.pdf"
                download="Sricharan_resume_java.pdf"
                aria-label="Download Sricharan resume"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 group-hover:border-cyber-teal group-hover:text-cyber-teal hover:bg-white/5 transition-all duration-300"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Social channels matrix */}
            <div className="flex flex-col gap-4 font-code">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Connect Matrix:</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/sricharan16-03"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyber-purple/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all duration-300"
                  title="GitHub"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/ch-sricharan-0528b6396"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyber-teal/40 hover:shadow-[0_0_15px_rgba(20,184,166,0.2)] transition-all duration-300"
                  title="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a
                  href="https://leetcode.com/u/Sricharan_ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-zinc-400 hover:text-white hover:border-cyber-pink/40 hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all duration-300"
                  title="LeetCode"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16.102 17.93l-2.69 2.607c-.466.451-1.211.451-1.677 0l-4.51-4.375a1.25 1.25 0 010-1.807l4.51-4.375c.466-.451 1.211-.451 1.677 0l2.69 2.607c.466.452.466 1.184 0 1.637l-2.69 2.606c-.466.452-1.211.452-1.677 0l-1.012-.981a.584.584 0 010-.818l1.012-.981a.584.584 0 01.838 0l1.013.98c.156.15.404.15.56 0l1.012-.98a.584.584 0 010-.818l-3.376-3.272a2.336 2.336 0 00-3.354 0l-4.51 4.375a2.5 2.5 0 000 3.614l4.51 4.375a2.336 2.336 0 003.354 0l3.376-3.272a.584.584 0 01.838 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column - Glassmorphic Form */}
          <div className="lg:col-span-7 w-full">
            <div className="p-8 md:p-10 rounded-[2.5rem] border border-white/5 glass-premium shadow-2xl relative overflow-hidden">
              
              {/* Confetti success screen trigger overlay */}
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-obsidian/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center z-20"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full bg-cyber-teal/10 border border-cyber-teal/30 flex items-center justify-center text-cyber-teal mb-6 shadow-[0_0_30px_rgba(20,184,166,0.2)]"
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </motion.div>
                    <h3 className="text-2xl font-display font-black tracking-tight text-white mb-2 uppercase">
                      Transmission Confirmed
                    </h3>
                    <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mb-6 font-display">
                      Your project packet was successfully routed to the main directory cache. Expect response vectors within 24 standard cycles.
                    </p>
                    <div className="font-code text-[10px] text-cyber-teal uppercase tracking-widest animate-pulse">
                      Status: 200_OK // celebrate_burst_active
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
                {/* Name Input wrapper with floating label style */}
                <div className="flex flex-col gap-1.5 w-full relative">
                  <label htmlFor="name" className="text-[10px] font-code uppercase tracking-widest text-zinc-500">
                    Sender Name / Agency
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className={`w-full px-5 py-4.5 rounded-2xl bg-white/[0.02] border font-display text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${
                      errors.name
                        ? "border-cyber-pink/50 focus:border-cyber-pink focus:shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                        : "border-white/5 focus:border-cyber-teal focus:shadow-[0_0_15px_rgba(20,184,166,0.15)]"
                    }`}
                  />
                  {errors.name && (
                    <span className="flex items-center gap-1 text-[10px] font-code text-cyber-pink mt-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Email Input */}
                <div className="flex flex-col gap-1.5 w-full relative">
                  <label htmlFor="email" className="text-[10px] font-code uppercase tracking-widest text-zinc-500">
                    Routing Node (Email)
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={`w-full px-5 py-4.5 rounded-2xl bg-white/[0.02] border font-display text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 ${
                      errors.email
                        ? "border-cyber-pink/50 focus:border-cyber-pink focus:shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                        : "border-white/5 focus:border-cyber-teal focus:shadow-[0_0_15px_rgba(20,184,166,0.15)]"
                    }`}
                  />
                  {errors.email && (
                    <span className="flex items-center gap-1 text-[10px] font-code text-cyber-pink mt-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* Message Input */}
                <div className="flex flex-col gap-1.5 w-full relative">
                  <label htmlFor="message" className="text-[10px] font-code uppercase tracking-widest text-zinc-500">
                    Project Blueprint Brief
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your project, contract, or timeline requirements..."
                    className={`w-full px-5 py-4.5 rounded-2xl bg-white/[0.02] border font-display text-sm text-white placeholder-zinc-600 focus:outline-none transition-all duration-300 resize-none ${
                      errors.message
                        ? "border-cyber-pink/50 focus:border-cyber-pink focus:shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                        : "border-white/5 focus:border-cyber-teal focus:shadow-[0_0_15px_rgba(20,184,166,0.15)]"
                    }`}
                  />
                  {errors.message && (
                    <span className="flex items-center gap-1 text-[10px] font-code text-cyber-pink mt-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyber-purple to-cyber-teal text-obsidian px-6 py-4.5 rounded-2xl font-display font-black text-xs tracking-wider uppercase transition-transform hover:scale-[1.02] active:scale-[0.98] duration-250 shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-obsidian border-t-transparent animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-code text-zinc-500">
          <span>DESIGN & ARCHITECTURE // © 2026 CHARAN</span>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>BACK_TO_TOP</span>
            <span>{"//"}</span>
            <span>LATENCY: 14MS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
