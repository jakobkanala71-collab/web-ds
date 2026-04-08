import type { ReactNode } from 'react';

type LinkProps = {
  href: string;
  variant?: 'default' | 'muted' | 'unstyled';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  label?: string;
};

const variantClasses: Record<string, string> = {
  default: 'font-body underline cursor-pointer transition-opacity duration-150 ease-out hover:opacity-70 text-text-primary',
  muted: 'font-body underline cursor-pointer transition-opacity duration-150 ease-out hover:opacity-70 text-text-body',
  unstyled: '',
};

const sizeClasses: Record<string, string> = {
  sm: 'text-p-small',
  md: 'text-p-base',
  lg: 'text-p-medium',
};

export default function Link({
  href,
  variant = 'default',
  size = 'md',
  external = false,
  className = '',
  style,
  children,
  label,
}: LinkProps) {
  const classes = [
    variantClasses[variant],
    variant !== 'unstyled' ? sizeClasses[size] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      className={classes}
      href={href}
      style={style}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children ?? label}
    </a>
  );
}
