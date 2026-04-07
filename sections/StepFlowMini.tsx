import { useEffect, useState } from "react";
import { Text, Container, Button } from "../primitives";
import { useInView } from "../hooks/useInView";
import { ScrollEntrance, ResponsiveHeading } from "../composites";

type Step = {
  title: string;
  description: string;
};

type StepFlowMiniProps = {
  heading: string;
  steps: Step[];
  ctaLabel?: string;
  onCtaClick?: () => void;
};

const STEP_DELAY = 500;
const START_DELAY = 400;
const ICON_SIZE = 44;

export default function StepFlowMini({
  heading,
  steps,
  ctaLabel,
  onCtaClick
}: StepFlowMiniProps) {
  const { ref, isInView } = useInView(0.3);
  const [lit, setLit] = useState(0);

  useEffect(() => {
    if (!isInView || lit > 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    steps.forEach((_, i) => {
      timers.push(
        setTimeout(
          () => setLit(l => Math.max(l, i + 1)),
          START_DELAY + i * STEP_DELAY
        )
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  const circle = (i: number) => {
    const isLit = lit > i;
    return (
      <div
        style={{
          width: `${ICON_SIZE}px`,
          height: `${ICON_SIZE}px`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          background: "var(--color-accent)",
          opacity: isLit ? 1 : 0,
          animation: isLit
            ? "stepEnter 600ms cubic-bezier(0.34,1.56,0.64,1) forwards"
            : "none"
        }}
      >
        <span style={{ lineHeight: 1, display: "flex" }}>
          <Text variant="p-large" color="primary" as="span">
            {i + 1}
          </Text>
        </span>
      </div>
    );
  };

  return (
    <section
      id="how-it-works"
      className="bg-background py-14 md:py-24"
      ref={ref}
    >
      <Container maxWidth="lg" padding="none">
        <div className="px-6">
          <style>{`
          @keyframes stepEnter {
            0% { transform: scale(0); opacity: 0; }
            60% { transform: scale(1.18); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>

          <ScrollEntrance
            show={isInView}
            className="mb-10 md:mb-14 pr-6 md:pr-0"
          >
            <ResponsiveHeading mobile="h5" desktop="h4">
              {heading}
            </ResponsiveHeading>
          </ScrollEntrance>

          {/* ── Desktop ── */}
          <div
            className="hidden md:grid gap-6"
            style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
          >
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col gap-6">
                {circle(i)}
                <ScrollEntrance show={lit > i} delay={80}>
                  <div className="flex flex-col gap-2 pr-6">
                    <span className="block md:hidden">
                      <Text variant="p-neulis" color="primary">
                        {step.title}
                      </Text>
                    </span>
                    <span className="hidden md:block">
                      <Text variant="h6">{step.title}</Text>
                    </span>
                    <Text variant="p-base" color="body">
                      {step.description}
                    </Text>
                  </div>
                </ScrollEntrance>
              </div>
            ))}
          </div>

          {/* ── Mobile ── */}
          <div className="flex md:hidden flex-col gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-5 items-start">
                {circle(i)}
                <div className="pt-2 flex flex-col gap-1">
                  <span className="block md:hidden">
                    <Text variant="p-neulis" color="primary">
                      {step.title}
                    </Text>
                  </span>
                  <span className="hidden md:block">
                    <Text variant="h6">{step.title}</Text>
                  </span>
                  <Text variant="p-base" color="body">
                    {step.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>

          {ctaLabel && (
            <ScrollEntrance
              show={lit >= steps.length}
              delay={500}
              className="hidden md:flex justify-start mt-10"
            >
              <Button
                label={ctaLabel}
                variant="primary"
                rounded
                onClick={onCtaClick}
              />
            </ScrollEntrance>
          )}
        </div>
      </Container>
    </section>
  );
}
