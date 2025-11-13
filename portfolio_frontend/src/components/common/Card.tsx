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
  // Use HTMLElementTagNameMap keys to avoid relying on JSX namespace
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
    >
      {children}
    </Comp>
  );
}
