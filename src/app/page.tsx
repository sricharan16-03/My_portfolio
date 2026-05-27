"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import ThreeBackground from "@/components/ThreeBackground";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <main className="relative min-h-screen bg-obsidian text-white overflow-hidden">
      {/* Premium WebGL Particle Universe */}
      <ThreeBackground />
      
      {/* Interactive Custom Pointer follower */}
      <CustomCursor />

      {/* Startup loading gatekeeper */}
      <Preloader onComplete={() => setLoadingComplete(true)} />

      {/* Smooth scroll portfolio stack */}
      {loadingComplete && (
        <SmoothScroll>
          <Navbar />
          <div className="flex flex-col relative z-10 w-full">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Experience />
            <Contact />
          </div>
        </SmoothScroll>
      )}
    </main>
  );
}
