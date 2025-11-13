import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  color?: "primary" | "secondary" | "success";
  className?: string;
};

/**
 * PUBLIC_INTERFACE
 * Badge - Small pill label with color variants.
 */
export function Badge({ children, color = "secondary", className }: Props) {
  const map = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    success: "badge-success",
  } as const;
  return <span className={cn("badge", map[color], className)}>{children}</span>;
}
