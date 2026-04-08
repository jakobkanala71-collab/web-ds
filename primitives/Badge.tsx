type BadgeProps = {
  label: string;
  variant?: 'light' | 'dark' | 'glass';
  size?: 'sm' | 'md';
};

const variantClasses: Record<string, string> = {
  light: 'bg-white text-text-primary',
  dark: 'bg-sand-950 text-white',
  glass: 'bg-white-15 backdrop-blur-sm text-white',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1 text-p-small',
  md: 'px-4 py-2 text-p-base',
};

export default function Badge({
  label,
  variant = 'light',
  size = 'md',
}: BadgeProps) {
  const classes = [
    'inline-flex items-center rounded-full font-body font-normal',
    variantClasses[variant],
    sizeClasses[size],
  ].join(' ');

  return <span className={classes}>{label}</span>;
}
