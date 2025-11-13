import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AllowedAs = "div" | "article" | "section";
type Props = {
  className?: string;
  children: ReactNode;
  as?: AllowedAs;
  hover?: boolean;
};

/**
 * PUBLIC_INTERFACE
 * Card - Surface container with subtle border and hover transition.
 */
export function Card({ className, children, as = "div", hover }: Props) {
  const TagMap: Record<AllowedAs, keyof HTMLElementTagNameMap> = {
    div: "div",
    article: "article",
    section: "section",
  };
  const Comp = TagMap[as];

  return (
    <Comp
      className={cn(
        "card p-5 transition-transform hover-card",
        hover ? "hover:-translate-y-0.5 hover:shadow-lg hover-glow" : "",
        className
      )}
      role={as === "section" ? "region" : undefined}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(135deg, rgb(59 130 246 / 0.07), transparent 30%, transparent 70%, rgb(217 70 239 / 0.07))",
          maskImage: "linear-gradient(#000, #000)",
        }}
        aria-hidden="true"
      />
      {children}
    </Comp>
  );
}
