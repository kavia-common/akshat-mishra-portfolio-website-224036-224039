"use client";

import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Certificates } from "@/components/sections/Certificates";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main id="main" className="min-h-screen relative overflow-x-clip grid-bg noise">
      {/* Decorative blobs (non-interactive, perf-friendly) */}
      <div aria-hidden="true" className="blob-wrap">
        <div className="blob" />
        <div className="blob blob--2" />
      </div>

      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Certificates />
      <Contact />
    </main>
  );
}
