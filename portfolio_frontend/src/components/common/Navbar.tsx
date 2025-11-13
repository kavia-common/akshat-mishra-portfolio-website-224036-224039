"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * PUBLIC_INTERFACE
 * Navbar - Sticky navigation with smooth scrolling and scrollspy via IntersectionObserver.
 * Accessible: keyboard-friendly, aria-current on active section.
 */
export function Navbar() {
  const [activeId, setActiveId] = useState<string>("home");
  const navRef = useRef<HTMLElement | null>(null);

  const sections = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "education", label: "Education" },
      { id: "certificates", label: "Certificates" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  useEffect(() => {
    const targetIds = sections.map((s) => s.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (!id) return;
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    targetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onScroll = () => {
      const nav = navRef.current;
      if (nav) {
        if (window.scrollY > 6) nav.classList.add("nav-scrolled");
        else nav.classList.remove("nav-scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const onJump = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    (el as HTMLElement).focus({ preventScroll: true });
  };

  return (
    <nav ref={navRef} className="navbar" aria-label="Primary" role="navigation">
      <div className="container-responsive flex items-center justify-between py-3">
        <a
          href="#home"
          onClick={onJump("home")}
          className="font-extrabold tracking-tight gradient-text text-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-md hover:opacity-95 transition-opacity"
          aria-label="Go to home"
        >
          AM
        </a>
        <ul className="hidden md:flex items-center gap-3">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={onJump(s.id)}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors nav-link focus-visible:ring-2 focus-visible:ring-blue-400",
                  activeId === s.id ? "text-blue-700" : "text-slate-700 hover:bg-slate-100"
                )}
                aria-current={activeId === s.id ? "page" : undefined}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="md:hidden">
          <a href="#contact" onClick={onJump("contact")} className="btn-base btn-primary">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
