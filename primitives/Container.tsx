import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  maxWidth?: "sm" | "md" | "lg" | "full";
  background?: "none" | "background" | "surface";
  centered?: boolean;
};

const paddingClasses: Record<string, string> = {
  none: "p-0",
  sm: "px-6 py-4",
  md: "px-6 py-8",
  lg: "px-6 py-12"
};

const maxWidthClasses: Record<string, string> = {
  sm: "max-w-(--breakpoint-sm)",
  md: "max-w-[900px]",
  lg: "max-w-(--breakpoint-xl)",
  full: "max-w-full"
};

const bgClasses: Record<string, string> = {
  none: "bg-transparent",
  background: "bg-background",
  surface: "bg-surface"
};

export default function Container({
  children,
  padding = "md",
  maxWidth = "lg",
  background = "none",
  centered = true
}: ContainerProps) {
  const classes = [
    "w-full",
    paddingClasses[padding],
    maxWidthClasses[maxWidth],
    bgClasses[background],
    centered ? "mx-auto" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
