type DividerProps = {
  spacing?: "sm" | "md" | "lg" | "xl";
};

const spacingClasses: Record<string, string> = {
  sm: "my-2",
  md: "my-6",
  lg: "my-12",
  xl: "my-24"
};

export default function Divider({ spacing = "md" }: DividerProps) {
  const classes = [
    "w-full h-0 border-0 border-t border-sand-950/60",
    spacingClasses[spacing]
  ].join(" ");

  return <hr className={classes} />;
}
