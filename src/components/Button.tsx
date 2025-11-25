import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  size?: "sm" | "md";
}

export default function Button({
  children,
  fullWidth,
  size = "md",
  className = "",
  ...rest
}: Props) {
  const sizeClasses =
    size === "sm"
      ? "px-3 py-1.5 text-sm"
      : "px-4 py-2 text-sm md:text-base";

  return (
    <button
      className={[
        "inline-flex items-center justify-center rounded-2xl border border-blue-500/50 bg-blue-600/90 hover:bg-blue-500 text-white font-medium shadow-sm transition disabled:opacity-60 disabled:cursor-not-allowed",
        sizeClasses,
        fullWidth ? "w-full" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
