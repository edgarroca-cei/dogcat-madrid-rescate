const BLOG_CARD_BASE =
  'bg-white text-brand-dark border border-brand-dark/10 shadow-xl shadow-brand-dark/10';

const BLOG_CARD_RELATED_BASE =
  'bg-white text-brand-dark border border-brand-dark/15 shadow-xl shadow-brand-dark/12';

const colorToAccentMap: Record<string, string> = {
  'bg-brand-cream text-brand-dark': 'bg-brand-cream text-brand-dark border-brand-dark/10',
  'bg-brand-green text-brand-dark': 'bg-brand-green text-brand-dark border-brand-green/30',
  'bg-brand-light text-brand-dark': 'bg-brand-light text-brand-dark border-brand-dark/10',
};

export function getBlogCardAccentClasses(color?: string) {
  return colorToAccentMap[color ?? ''] ?? 'bg-brand-cream text-brand-dark border-brand-dark/10';
}

export function getBlogCardClasses(color?: string, variant: 'default' | 'related' = 'default') {
  return variant === 'related' ? BLOG_CARD_RELATED_BASE : BLOG_CARD_BASE;
}
