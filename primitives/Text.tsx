import type { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7' | 'p-xl' | 'p-large' | 'p-medium' | 'p-base' | 'p-small' | 'p-neulis';
  color?: 'primary' | 'body' | 'muted' | 'accent' | 'accent-strong' | 'white' | 'positive' | 'positive-muted';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
};

const variantClasses: Record<string, string> = {
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
  h4: 'text-h4',
  h5: 'text-h5',
  h6: 'text-h6',
  h7: 'text-h7',
  'p-xl': 'text-p-xl',
  'p-large': 'text-p-large',
  'p-medium': 'text-p-medium',
  'p-base': 'text-p-base',
  'p-small': 'text-p-small',
  'p-neulis': 'text-p-neulis',
};

const colorClasses: Record<string, string> = {
  primary: 'text-text-primary',
  body: 'text-text-body',
  muted: 'text-text-muted',
  accent: 'text-accent',
  'accent-strong': 'text-accent-strong',
  white: 'text-white',
  positive: 'text-positive',
  'positive-muted': 'text-positive-muted',
};

export default function Text({
  children,
  variant = 'p-base',
  color,
  as,
}: TextProps) {
  const isHeading = variant.startsWith('h');
  const resolvedColor = color ?? (isHeading ? 'primary' : 'body');

  const defaultTag = () => {
    if (isHeading) return variant as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    return 'p';
  };

  const Tag = as || defaultTag();

  const classes = [
    'm-0 whitespace-pre-line',
    variantClasses[variant],
    colorClasses[resolvedColor],
  ].join(' ');

  return <Tag className={classes}>{children}</Tag>;
}
