import NextImage from "next/image";

type ImageProps = {
  src: string;
  alt: string;
  radius?: "none" | "sm" | "md" | "lg" | "xl";
  aspectRatio?: "auto" | "1/1" | "16/9";
  objectFit?: "cover" | "contain";
  size?: "full" | "fixed";
  className?: string;
  decorative?: boolean;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
};

const radiusClasses: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl"
};

const ratioClasses: Record<string, string> = {
  auto: "",
  "1/1": "aspect-square",
  "16/9": "aspect-video"
};

export default function Image({
  src,
  alt,
  radius = "none",
  aspectRatio = "auto",
  objectFit = "cover",
  size = "full",
  className = "",
  decorative = false,
  width,
  height,
  fill,
  priority = false
}: ImageProps) {
  const wrapperClasses = [
    radiusClasses[radius],
    ratioClasses[aspectRatio],
    className
  ]
    .filter(Boolean)
    .join(" ");

  const imgClasses = [
    "block",
    size === "full" ? "w-full h-auto" : "",
    objectFit === "contain" ? "object-contain" : "object-cover"
  ]
    .filter(Boolean)
    .join(" ");

  const useFill = fill ?? (!width && !height);

  if (useFill) {
    return (
      <div
        className={`relative ${
          size === "full" ? "w-full h-full" : ""
        } ${wrapperClasses}`}
      >
        <NextImage
          className={imgClasses}
          src={src}
          alt={decorative ? "" : alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          priority={priority}
          {...(decorative ? { "aria-hidden": true as const } : {})}
        />
      </div>
    );
  }

  return (
    <NextImage
      className={`${imgClasses} ${wrapperClasses}`}
      src={src}
      alt={decorative ? "" : alt}
      width={width}
      height={height}
      priority={priority}
      {...(decorative ? { "aria-hidden": true as const } : {})}
    />
  );
}
