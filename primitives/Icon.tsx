type IconProps = {
  src?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "dark" | "light";
};

const sizeClasses: Record<string, string> = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-8"
};

export default function Icon({ src, size = "md", color = "dark" }: IconProps) {
  const classes = [
    "inline-flex items-center justify-center",
    sizeClasses[size],
    color === "light" ? "brightness-0 invert" : ""
  ]
    .filter(Boolean)
    .join(" ");

  if (!src) return <span className={classes} aria-hidden />;

  return (
    <span className={classes}>
      <img className="w-full h-full" src={src} alt="" />
    </span>
  );
}
