import { Text, Container, Divider } from '../primitives';
import { useInView } from '../hooks/useInView';
import { ScrollEntrance, IconCircle } from '../composites';

type USP = {
  icon: string;
  title: string;
  description: string;
};

type USPHeroProps = {
  usps: USP[];
};

export default function USPHero({ usps }: USPHeroProps) {
  const { ref, isInView } = useInView(0.1);

  return (
    <section className="bg-background py-3 md:py-8" ref={ref}>
      <Container maxWidth="lg" padding="md">
        <Divider spacing="sm" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-6 md:pt-8">
          {usps.map((usp, i) => (
            <ScrollEntrance key={i} show={isInView} delay={100 + i * 80}>
              <div className="flex flex-col">
                <IconCircle icon={usp.icon} variant="muted" iconColor="dark" />
                <div className="mt-4"><Text variant="p-neulis" color="primary">{usp.title}</Text></div>
                <div className="mt-1"><Text variant="p-base" color="body">{usp.description}</Text></div>
              </div>
            </ScrollEntrance>
          ))}
        </div>
      </Container>
    </section>
  );
}
