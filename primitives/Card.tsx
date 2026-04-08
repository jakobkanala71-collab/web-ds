import type { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'xs' | 'sm' | 'md' | 'lg';
  background?: 'background' | 'surface' | 'dark' | 'light-glass' | 'dark-glass';
};

const paddingClasses: Record<string, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const radiusClasses: Record<string, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
};

const shadowClasses: Record<string, string> = {
  none: 'shadow-none',
  xs: 'shadow-xs',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

const bgClasses: Record<string, string> = {
  background: 'bg-background',
  surface: 'bg-surface',
  dark: 'bg-sand-950',
  'light-glass': [
    'glass-progressive-blur relative overflow-hidden',
    'border-t-[1.2px] border-b-[1.2px] border-l-[0.5px] border-r-[0.5px] border-glass-light-border',
  ].join(' '),
  'dark-glass': [
    'glass-progressive-blur relative overflow-hidden text-white',
    'border-t-[1.2px] border-b-[1.2px] border-l-[0.5px] border-r-[0.5px] border-glass-dark-border',
  ].join(' '),
};

export default function Card({
  children,
  padding = 'md',
  radius = 'lg',
  shadow = 'sm',
  background = 'background',
}: CardProps) {
  const classes = [
    'flex flex-col items-start w-full h-full',
    paddingClasses[padding],
    radiusClasses[radius],
    (background === 'light-glass' || background === 'dark-glass') ? '' : shadowClasses[shadow],
    bgClasses[background],
  ]
    .filter(Boolean)
    .join(' ');

  const glassStyles: Record<string, React.CSSProperties> = {
    'light-glass': {
      background: 'var(--gradient-glass-light)',
    },
    'dark-glass': {
      background: 'var(--gradient-glass-dark)',
    },
  };

  const style = background === 'light-glass' || background === 'dark-glass'
    ? glassStyles[background]
    : undefined;

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
