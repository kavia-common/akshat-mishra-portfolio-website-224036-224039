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
        "card p-5 transition-transform",
        hover ? "hover:-translate-y-0.5 hover:shadow-lg" : "",
        className
      )}
      role={as === "section" ? "region" : undefined}
    >
      {children}
    </Comp>
  );
}
