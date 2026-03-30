import { Icon } from '../primitives';

type IconCircleProps = {
  icon: string;
  size?: 'sm' | 'md';
  variant?: 'filled' | 'muted';
  iconSize?: 'sm' | 'md' | 'lg';
  iconColor?: 'dark' | 'light';
  bg?: string;
  className?: string;
};

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
};

export default function IconCircle({
  icon,
  size = 'md',
  variant = 'filled',
  iconSize = 'md',
  iconColor = 'dark',
  bg = 'bg-surface',
  className = '',
}: IconCircleProps) {
  const base = `${sizeClasses[size]} rounded-full flex items-center justify-center flex-shrink-0`;

  const variantClasses =
    variant === 'muted'
      ? 'bg-transparent border border-sand-950/60'
      : bg;

  return (
    <div className={`${base} ${variantClasses} ${className}`}>
      <Icon name={icon} size={iconSize} color={iconColor} />
    </div>
  );
}
