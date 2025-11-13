import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  color?: "primary" | "secondary" | "success";
  className?: string;
};

/**
 * PUBLIC_INTERFACE
 * Badge - Small pill label with color variants and accessible focus styles.
 */
export function Badge({ children, color = "secondary", className }: Props) {
  const map = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    success: "badge-success",
  } as const;
  return (
    <span
      className={cn(
        "badge focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        map[color],
        className
      )}
      tabIndex={0}
    >
      {children}
    </span>
  );
}
