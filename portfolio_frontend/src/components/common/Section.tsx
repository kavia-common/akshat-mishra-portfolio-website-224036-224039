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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.12 }
    );

    root.querySelectorAll<HTMLElement>(".reveal").forEach((el) => observer.observe(el));
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
            {title && <h2 className="section-title reveal">{title}</h2>}
            {subtitle && <p className="section-subtitle max-w-2xl reveal">{subtitle}</p>}
          </header>
        )}
        <div className="reveal">{children}</div>
      </div>
    </section>
  );
}
