import type { ReactNode } from "react";
import { Text } from "../primitives";

type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "h7";

type ResponsiveHeadingProps = {
  children: ReactNode;
  mobile: HeadingVariant;
  desktop: HeadingVariant;
  color?: "primary" | "white";
  breakpoint?: "md" | "lg";
};

export default function ResponsiveHeading({
  children,
  mobile,
  desktop,
  color,
  breakpoint = "lg"
}: ResponsiveHeadingProps) {
  const showClass = breakpoint === "md" ? "md:block" : "lg:block";
  const hideClass = breakpoint === "md" ? "md:hidden" : "lg:hidden";

  return (
    <>
      <div className={hideClass}>
        <Text variant={mobile} color={color}>
          {children}
        </Text>
      </div>
      <div className={`hidden ${showClass}`}>
        <Text variant={desktop} color={color}>
          {children}
        </Text>
      </div>
    </>
  );
}
