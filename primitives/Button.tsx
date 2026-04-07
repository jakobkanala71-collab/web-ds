import { useRef } from "react";
import type { ReactNode } from "react";

type ButtonProps = {
  label: string;
  variant?: "primary" | "ghost" | "secondary";
  size?: "default" | "xl";
  rounded?: boolean;
  icon?: boolean;
  iconElement?: ReactNode;
  iconOnly?: boolean;
  animated?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
};

const arrowIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 10H16M16 10L11 5M16 10L11 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const variantClasses: Record<string, string> = {
  primary: "bg-sand-950 text-white border-0",
  ghost: "btn-ghost bg-transparent text-text-primary",
  secondary: "bg-white text-text-primary border-border"
};

export default function Button({
  label,
  variant = "primary",
  size = "default",
  rounded = false,
  icon = false,
  iconElement,
  iconOnly = false,
  animated = true,
  ariaLabel,
  onClick
}: ButtonProps) {
  const fillRef = useRef<HTMLDivElement>(null);

  const hasFill = animated;

  function handleMouseEnter(e: React.MouseEvent<HTMLButtonElement>) {
    if (!animated) return;
    if (variant === "primary") {
      e.currentTarget.style.color = "var(--color-text-primary)";
      e.currentTarget.style.transition =
        "background 0.5s cubic-bezier(0.16,1,0.3,1), color 0.3s ease";
      e.currentTarget.style.background = "var(--color-accent)";
    }
    if (variant === "ghost" || variant === "secondary") {
      e.currentTarget.style.borderColor = "var(--color-accent)";
    }
    if (!hasFill || !fillRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const maxDist = Math.sqrt(
      Math.max(x, rect.width - x) ** 2 + Math.max(y, rect.height - y) ** 2
    );
    const scale = (maxDist * 2) / 100;

    fillRef.current.style.transition = "none";
    fillRef.current.style.left = `${x}px`;
    fillRef.current.style.top = `${y}px`;
    fillRef.current.style.transform = "translate(-50%, -50%) scale(0)";
    fillRef.current.getBoundingClientRect(); // force reflow
    fillRef.current.style.transition =
      "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
    fillRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLButtonElement>) {
    if (!animated) return;
    if (variant === "primary") {
      e.currentTarget.style.color = "";
      e.currentTarget.style.transition =
        "background 0.5s cubic-bezier(0.16,1,0.3,1), color 0.3s ease";
      e.currentTarget.style.background = "";
    }
    if (variant === "ghost") {
      e.currentTarget.style.borderColor =
        "color-mix(in srgb, var(--color-sand-950) 40%, transparent)";
    } else if (variant === "secondary") {
      e.currentTarget.style.borderColor = "";
    }
    if (!hasFill || !fillRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const maxDist = Math.sqrt(
      Math.max(x, rect.width - x) ** 2 + Math.max(y, rect.height - y) ** 2
    );
    const scale = (maxDist * 2) / 100;
    fillRef.current.style.left = `${x}px`;
    fillRef.current.style.top = `${y}px`;
    fillRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
    fillRef.current.getBoundingClientRect();
    fillRef.current.style.transition =
      "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
    fillRef.current.style.transform = "translate(-50%, -50%) scale(0)";
  }

  const fillColor = "var(--color-accent)";

  const borderStyle =
    variant === "ghost"
      ? {
          borderColor:
            "color-mix(in srgb, var(--color-sand-950) 40%, transparent)",
          outline: "none",
          overflow: "hidden" as const
        }
      : { outline: "none", overflow: "hidden" as const };

  const classes = [
    `inline-flex ${
      size === "xl" ? "h-14" : "h-11"
    } justify-center items-center gap-3`,
    "relative overflow-hidden isolate border cursor-pointer outline-none",
    size === "xl" ? "text-p-medium" : "text-p-base",
    "transition-[background,border-color,opacity] duration-150",
    variantClasses[variant],
    rounded ? "rounded-full" : "rounded-sm",
    iconOnly ? "w-11" : "px-6 py-2"
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      style={borderStyle}
      onClick={onClick}
      aria-label={iconOnly ? ariaLabel || label : ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {hasFill && (
        <div
          ref={fillRef}
          style={{
            position: "absolute",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background: fillColor,
            transform: "translate(-50%, -50%) scale(0)",
            zIndex: -1,
            pointerEvents: "none"
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-3 pointer-events-none">
        {iconElement}
        {!iconOnly && label}
        {(icon || iconOnly) && arrowIcon}
      </span>
    </button>
  );
}
