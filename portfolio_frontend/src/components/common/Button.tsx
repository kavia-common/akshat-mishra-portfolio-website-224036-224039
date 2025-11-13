import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

/**
 * PUBLIC_INTERFACE
 * Button - Accessible button with variants.
 */
export function Button({
  className,
  children,
  variant = "primary",
  leftIcon,
  rightIcon,
  ...rest
}: Props) {
  const map = {
    primary: "btn-base btn-primary",
    secondary: "btn-base btn-secondary",
    ghost: "btn-base btn-ghost",
  } as const;
  return (
    <button className={cn(map[variant], className)} {...rest}>
      {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
      <span>{children}</span>
      {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
    </button>
  );
}
