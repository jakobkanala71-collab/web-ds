import { Text, Button, Image, Container } from "../primitives";
import { useInView } from "../hooks/useInView";
import { ScrollEntrance, ResponsiveHeading } from "../composites";

type TextImageProps = {
  heading: React.ReactNode;
  body: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  secondaryCtaLabel?: string;
  onSecondaryCtaClick?: () => void;
  image: string;
  imageAlt: string;
  variant?:
    | "image-right"
    | "image-left"
    | "image-right-bleed"
    | "image-left-bleed";
  background?: "white" | "surface" | "yellow";
  theme?: "dark" | "light";
};

export default function TextImage({
  heading,
  body,
  ctaLabel,
  onCtaClick,
  secondaryCtaLabel,
  onSecondaryCtaClick,
  image,
  imageAlt,
  variant = "image-right",
  background = "white",
  theme = "light"
}: TextImageProps) {
  const isDark = theme === "dark";
  const { ref, isInView } = useInView(background === "yellow" ? 0.45 : 0.15);

  const bg = isDark
    ? "bg-sand-950"
    : background === "surface"
    ? "bg-surface"
    : background === "yellow"
    ? ""
    : "bg-background";
  const textColor = isDark ? ("white" as const) : ("primary" as const);
  const bodyColor = isDark ? ("white" as const) : ("body" as const);
  const bgStyle =
    background === "yellow"
      ? {
          backgroundColor: isInView
            ? "var(--color-yellow-200)"
            : "var(--color-background)",
          transition: "background-color 0.8s cubic-bezier(0.16,1,0.3,1)"
        }
      : {};

  // ── Full-bleed 50/50 variants ──────────────────────────────────────
  if (variant === "image-right-bleed" || variant === "image-left-bleed") {
    const imageOnLeft = variant === "image-left-bleed";

    return (
      <section className={`${bg} overflow-hidden`} style={bgStyle} ref={ref}>
        <style>{`
          .ti-bleed-text {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
          }
          @media (min-width: 1024px) {
            .ti-bleed-text-right {
              padding-left: max(1.5rem, calc((100vw - var(--breakpoint-xl)) / 2 + 1.5rem));
              padding-right: 2rem;
            }
            .ti-bleed-text-left {
              padding-right: max(1.5rem, calc((100vw - var(--breakpoint-xl)) / 2 + 1.5rem));
              padding-left: 2rem;
            }
          }
        `}</style>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
          {/* Text column */}
          <div
            className={`ti-bleed-text ${
              imageOnLeft
                ? "ti-bleed-text-left lg:order-2"
                : "ti-bleed-text-right"
            } flex flex-col justify-center gap-5 py-14 lg:py-20`}
          >
            <ResponsiveHeading mobile="h4" desktop="h3" color={textColor}>
              {heading}
            </ResponsiveHeading>
            <Text variant="p-medium" color={bodyColor}>
              {body}
            </Text>
            {(ctaLabel || secondaryCtaLabel) && (
              <div className="mt-2 flex flex-wrap gap-3">
                {ctaLabel && (
                  <Button
                    label={ctaLabel}
                    variant={isDark ? "secondary" : "primary"}
                    rounded
                    onClick={onCtaClick}
                  />
                )}
                {secondaryCtaLabel && (
                  <Button
                    label={secondaryCtaLabel}
                    variant="ghost"
                    rounded
                    onClick={onSecondaryCtaClick}
                  />
                )}
              </div>
            )}
          </div>

          {/* Full-bleed image column */}
          <div
            className={`relative aspect-square lg:aspect-auto lg:h-auto ${
              imageOnLeft ? "lg:order-1" : ""
            }`}
          >
            <div className="absolute inset-0">
              <Image
                src={image}
                alt={imageAlt}
                radius="none"
                objectFit="contain"
                fill
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Standard contained variants ───────────────────────────────────
  const reversed = variant === "image-left";

  return (
    <section className={`${bg} py-16 md:py-24`} style={bgStyle} ref={ref}>
      <Container maxWidth="lg" padding="md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div
            className={`flex flex-col gap-5 ${reversed ? "lg:order-2" : ""}`}
          >
            <ScrollEntrance show={isInView} delay={0} animation="slide-in-left">
              <ResponsiveHeading
                mobile="h4"
                desktop="h3"
                breakpoint="md"
                color={textColor}
              >
                {heading}
              </ResponsiveHeading>
            </ScrollEntrance>
            <ScrollEntrance
              show={isInView}
              delay={100}
              animation="slide-in-left"
            >
              <Text variant="p-medium" color={bodyColor}>
                {body}
              </Text>
            </ScrollEntrance>
            {(ctaLabel || secondaryCtaLabel) && (
              <ScrollEntrance
                show={isInView}
                delay={200}
                animation="slide-in-left"
                className="mt-2"
              >
                <div className="flex flex-wrap gap-3">
                  {ctaLabel && (
                    <Button
                      label={ctaLabel}
                      variant={isDark ? "secondary" : "primary"}
                      rounded
                      onClick={onCtaClick}
                    />
                  )}
                  {secondaryCtaLabel && (
                    <Button
                      label={secondaryCtaLabel}
                      variant="ghost"
                      rounded
                      onClick={onSecondaryCtaClick}
                    />
                  )}
                </div>
              </ScrollEntrance>
            )}
          </div>

          {/* Image */}
          <ScrollEntrance
            show={isInView}
            delay={150}
            animation="fade-in-up"
            className={reversed ? "lg:order-1" : ""}
          >
            <div className="overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={imageAlt}
                radius="none"
                width={800}
                height={800}
                objectFit="contain"
              />
            </div>
          </ScrollEntrance>
        </div>
      </Container>
    </section>
  );
}
