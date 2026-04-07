import { useState, useRef, useEffect } from "react";
import { Text, Container } from "../primitives";
import { useInView } from "../hooks/useInView";
import { ScrollEntrance, ResponsiveHeading } from "../composites";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  heading: string;
  items: FaqItem[];
};

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
  isInView
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  isInView: boolean;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, item.answer]);

  return (
    <ScrollEntrance show={isInView} delay={150 + index * 70}>
      <div className="border-b border-border">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between py-3 text-left cursor-pointer group"
          aria-expanded={isOpen}
        >
          <span style={{ fontWeight: 500 }}>
            <span className="block md:hidden">
              <Text variant="p-neulis" color="primary">
                {item.question}
              </Text>
            </span>
            <span className="hidden md:block">
              <Text variant="h6" color="primary">
                {item.question}
              </Text>
            </span>
          </span>
          <div
            className="flex-shrink-0 ml-4 w-14 h-14 rounded-full bg-surface relative"
            style={{
              transform: isOpen ? "rotate(-45deg)" : "rotate(0deg)",
              transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)"
            }}
          >
            {/* Horizontal bar */}
            <span
              className="absolute block bg-sand-950 rounded-full"
              style={{
                width: "20px",
                height: "2px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }}
            />
            {/* Vertical bar */}
            <span
              className="absolute block bg-sand-950 rounded-full"
              style={{
                width: "20px",
                height: "2px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) rotate(90deg)"
              }}
            />
          </div>
        </button>

        <div
          className="overflow-hidden transition-[height,opacity] duration-400 ease-out"
          style={{
            height: isOpen ? `${height}px` : "0px",
            opacity: isOpen ? 1 : 0
          }}
        >
          <div ref={contentRef} className="pb-5 pr-12">
            <Text variant="p-base" color="body">
              {item.answer}
            </Text>
          </div>
        </div>
      </div>
    </ScrollEntrance>
  );
}

export default function FaqAccordion({ heading, items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="bg-background py-14 md:py-24" ref={ref}>
      <Container maxWidth="lg" padding="md">
        <ScrollEntrance show={isInView} className="mb-12 pr-6 md:pr-0">
          <ResponsiveHeading mobile="h5" desktop="h4">
            {heading}
          </ResponsiveHeading>
        </ScrollEntrance>

        <div className="border-t border-border">
          {items.map((item, i) => (
            <AccordionItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              index={i}
              isInView={isInView}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
