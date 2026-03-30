type ImageProps = {
  src: string;
  alt: string;
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  aspectRatio?: 'auto' | '1/1' | '16/9';
  objectFit?: 'cover' | 'contain';
  size?: 'full' | 'fixed';
  className?: string;
  decorative?: boolean;
};

const radiusClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
};

const ratioClasses: Record<string, string> = {
  auto: '',
  '1/1': 'aspect-square',
  '16/9': 'aspect-video',
};

export default function Image({
  src,
  alt,
  radius = 'none',
  aspectRatio = 'auto',
  objectFit = 'cover',
  size = 'full',
  className = '',
  decorative = false,
}: ImageProps) {
  const classes = [
    'block',
    size === 'full' ? 'w-full h-auto' : '',
    objectFit === 'contain' ? 'object-contain' : 'object-cover',
    radiusClasses[radius],
    ratioClasses[aspectRatio],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <img
      className={classes}
      src={src}
      alt={decorative ? '' : alt}
      {...(decorative ? { 'aria-hidden': true as const } : {})}
    />
  );
}
