import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Text, Button, Image } from '../primitives';
import { ResponsiveHeading } from '../composites';

type InsetHeroProps = {
  heading: ReactNode;
  body: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  mobileSecondaryCtaLabel?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  backgroundImage: string;
  cardStackImage: string;
};

function t(delay: number) {
  return `transform 1.1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, opacity 0.7s ease ${delay}ms`;
}

export default function InsetHero({
  heading,
  body,
  primaryCtaLabel,
  secondaryCtaLabel,
  mobileSecondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  backgroundImage,
  cardStackImage,
}: InsetHeroProps) {
  const [ready, setReady] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [initPad, setInitPad] = useState(12);
  const [isMobile, setIsMobile] = useState(false);
  const [isWideDesktop, setIsWideDesktop] = useState(true);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    function updatePad() {
      const w = window.innerWidth;
      if (w >= 1536) setInitPad(w * 0.055);
      else if (w >= 1280) setInitPad(w * 0.03);
      else if (w >= 768) setInitPad(24);
      else setInitPad(16);
      setIsMobile(w < 768);
      setIsWideDesktop(w >= 1024);
    }
    updatePad();
    window.addEventListener('resize', updatePad);
    return () => window.removeEventListener('resize', updatePad);
  }, []);

  useEffect(() => {
    function onScroll() { setScrollY(window.scrollY); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const THRESHOLD = 480;
  const sp = Math.min(scrollY / THRESHOLD, 1);
  const hPad = initPad * (1 - sp);
  const bPad = 40 * (1 - sp);
  const radius = 52 * (1 - sp);

  const imgH = isMobile ? '38vh' : '50vh';
  const borderRadiusVal = isMobile
    ? `0 0 0 ${radius}px`
    : `0 0 ${radius}px ${radius}px`;

  const BADGE_W = 200;
  const BADGE_H = Math.round(BADGE_W * 1.1);
  const OVERLAP = Math.round(BADGE_H * 0.7);

  return (
    <section className="bg-background">


      {/* ── Image + badge ───────────────────────────────────────────── */}
      <div
        className="w-full relative"
        style={{
          paddingLeft: `${hPad}px`,
          paddingRight: isMobile ? 0 : `${hPad}px`,
          paddingBottom: isMobile
            ? `${BADGE_H - OVERLAP}px`
            : `${bPad}px`,
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{
            height: imgH,
            borderRadius: borderRadiusVal,
            clipPath: ready
              ? (isMobile ? `inset(0 0 0% 0 round 0 0 0 ${radius}px)` : `inset(0 0 0% 0 round 0 0 ${radius}px ${radius}px)`)
              : (isMobile ? `inset(0 0 100% 0 round 0 0 0 ${radius}px)` : `inset(0 0 100% 0 round 0 0 ${radius}px ${radius}px)`),
            transition: ready ? 'clip-path 1s cubic-bezier(0.7,0,0.3,1) 0ms' : 'none',
            transform: 'translateZ(0)',
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        </div>

        {/* Badge */}
        {isMobile ? (
          <div
            className="absolute"
            style={{
              left: '50%',
              marginLeft: `-${BADGE_W / 2}px`,
              transform: ready ? 'translateY(0)' : 'translateY(60px)',
              top: `calc(${imgH} - ${OVERLAP}px)`,
              width: `${BADGE_W}px`,
              zIndex: 10,
              opacity: ready ? 1 : 0,
              transition: t(750),
            }}
          >
            <div
              className="rounded-xl overflow-hidden"
              style={{
                aspectRatio: '1 / 1.1',
              }}
            >
              <Image src={cardStackImage} alt="" radius="none" />
            </div>
          </div>
        ) : (
          <div
            className="absolute rounded-xl overflow-hidden"
            style={{
              right: isWideDesktop ? 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))' : '6rem',
              top: isWideDesktop ? `calc(${imgH} - 200px)` : `calc(${imgH} - 260px)`,
              width: isWideDesktop ? '380px' : '260px',
              aspectRatio: '1 / 1.1',
              zIndex: 10,
              opacity: ready ? 1 : 0,
              transform: ready ? 'translateY(0)' : 'translateY(60px)',
              transition: t(750),
            }}
          >
            <Image src={cardStackImage} alt="" radius="none" />
          </div>
        )}
      </div>

      {/* ── Text + CTAs ─────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-[var(--breakpoint-xl)] mx-auto">
        <div className="px-8 md:px-6 pt-1 md:pt-8 pb-16">
          <div className="flex flex-col gap-4 max-w-2xl items-start text-left">

            <div style={{ opacity: ready ? 1 : 0, transform: ready ? 'translateX(0)' : 'translateX(-2rem)', transition: t(1020) }}>
              <ResponsiveHeading mobile="h4" desktop="h3">{heading}</ResponsiveHeading>
            </div>

            <div style={{ opacity: ready ? 1 : 0, transform: ready ? 'translateX(0)' : 'translateX(-2rem)', transition: t(1160) }}>
              <Text variant="p-medium" color="body">{body}</Text>
            </div>

            <div style={{ opacity: ready ? 1 : 0, transform: ready ? 'translateY(0)' : 'translateY(1rem)', transition: t(1300), marginTop: '1.5rem', width: isMobile ? '100%' : undefined }}>
              <div className={`flex gap-3 ${isMobile ? 'flex-col items-start' : 'flex-row flex-wrap'}`}>
                {!isMobile && <Button label={primaryCtaLabel} variant="primary" size="default" rounded onClick={onPrimaryCtaClick} />}
                {secondaryCtaLabel && (
                  <Button label={isMobile && mobileSecondaryCtaLabel ? mobileSecondaryCtaLabel : secondaryCtaLabel} variant={isMobile ? 'primary' : 'ghost'} size={isMobile ? 'xl' : 'default'} iconName="device-mobile" rounded onClick={onSecondaryCtaClick} />
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
