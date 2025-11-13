import { ReactNode } from "react";
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
 * Section - Semantic wrapper with padding, optional alt background, title and subtitle.
 */
export function Section({ id, title, subtitle, alt, children }: Props) {
  return (
    <section
      id={id}
      className={cn(alt ? "section-alt" : "section")}
      aria-label={title || id}
      tabIndex={-1}
    >
      <div className="container-responsive">
        {(title || subtitle) && (
          <header className="mb-8">
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && (
              <p className="section-subtitle max-w-2xl">{subtitle}</p>
            )}
          </header>
        )}
        <div className="animate-fadeInUp">{children}</div>
      </div>
    </section>
  );
}
