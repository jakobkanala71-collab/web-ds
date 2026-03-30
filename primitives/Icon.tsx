const iconModules = import.meta.glob<{ default: string }>(
  '../assets/icons/*.svg',
  { eager: true }
);
const iconNameToUrl: Record<string, string> = {};
for (const path in iconModules) {
  const mod = iconModules[path];
  const name = path.replace(/^.*[/\\]/, '').replace(/\.svg$/i, '');
  if (name && mod?.default) iconNameToUrl[name.toLowerCase()] = mod.default;
}

type IconProps = {
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'dark' | 'light';
};

const sizeClasses: Record<string, string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
  xl: 'size-8',
};

export default function Icon({
  name,
  size = 'md',
  color = 'dark',
}: IconProps) {
  const classes = [
    'inline-flex items-center justify-center',
    sizeClasses[size],
    color === 'light' ? 'brightness-0 invert' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const url = iconNameToUrl[name.toLowerCase()];
  if (!url) return <span className={classes} aria-hidden />;

  return (
    <span className={classes}>
      <img className="w-full h-full" src={url} alt="" />
    </span>
  );
}
