import React, { ReactNode, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title?: string;
  subtitle?: string;
  alt?: boolean;
  children: ReactNode;
};

/**
 * PUBLIC_INTERFACE
 * Section - Semantic wrapper with padding, optional alt background, title and subtitle,
 * and reveal-on-scroll animation using IntersectionObserver.
 */
export function Section({ id, title, subtitle, alt, children }: Props) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // Respect prefers-reduced-motion: instantly reveal without observing
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      root.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        el.classList.add("reveal-visible");
        el.style.transition = "none";
        el.style.transform = "none";
        el.style.filter = "none";
        el.style.opacity = "1";
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const target = e.target as HTMLElement;
            target.classList.add("reveal-visible");
            observer.unobserve(target);
          }
        });
      },
      {
        // Trigger a bit earlier so content reveals as it approaches the viewport center
        rootMargin: "0px 0px -10% 0px",
        threshold: [0.06, 0.12, 0.25],
      }
    );

    // Observe all reveal elements and assign index-based CSS var for optional staggering
    const elements = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    elements.forEach((el, idx) => {
      el.style.setProperty("--i", String(idx));
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={rootRef}
      className={cn(alt ? "section-alt" : "section")}
      aria-label={title || id}
      tabIndex={-1}
    >
      <div className="container-responsive">
        {(title || subtitle) && (
          <header className="mb-8">
            {title && (
              <h2 className="section-title gradient-text accent-underline reveal">
                {title}
              </h2>
            )}
            {subtitle && <p className="section-subtitle max-w-2xl reveal">{subtitle}</p>}
          </header>
        )}
        <div className="reveal">{children}</div>
      </div>
    </section>
  );
}
