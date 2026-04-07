import type { ReactNode } from "react";

export type Animation =
  | "fade-in-up"
  | "scale-in"
  | "slide-in-left"
  | "slide-in-right"
  | "circle-pop"
  | "draw-y";

type ScrollEntranceProps = {
  children: ReactNode;
  show: boolean;
  animation?: Animation;
  delay?: number;
  className?: string;
};

const animationClass: Record<Animation, string> = {
  "fade-in-up": "animate-fade-in-up",
  "scale-in": "animate-scale-in",
  "slide-in-left": "animate-slide-in-left",
  "slide-in-right": "animate-slide-in-right",
  "circle-pop": "animate-circle-pop",
  "draw-y": "animate-draw-y"
};

export default function ScrollEntrance({
  children,
  show,
  animation = "fade-in-up",
  delay = 0,
  className = ""
}: ScrollEntranceProps) {
  return (
    <div
      className={`${
        show ? animationClass[animation] : "opacity-0"
      } ${className}`}
      style={show && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
