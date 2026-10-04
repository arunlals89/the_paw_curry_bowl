"use client";

import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "dark";
  loading?: boolean;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-paw-orange text-white shadow-soft hover:bg-paw-orange-dark",
  secondary: "bg-paw-orange-light text-paw-orange-dark hover:bg-[#f6d8b8]",
  dark: "bg-bark text-white hover:opacity-90",
  ghost: "bg-transparent text-bark-soft hover:text-bark",
};

export function Button({
  variant = "primary",
  loading,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={`flex w-full items-center justify-center rounded-2xl px-5 py-3.5 text-[15px] font-bold transition disabled:opacity-50 ${variantClasses[variant]} ${className ?? ""}`}
      {...props}
    >
      {loading ? (
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      ) : (
        children
      )}
    </button>
  );
}
