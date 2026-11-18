const FILE_EXT = /\.[a-z0-9]+$/i;

export function url(path = ''): string {
  const base = import.meta.env.BASE_URL || '/';
  const clean = path.replace(/^\/+/, '');
  if (!clean) return base;
  if (FILE_EXT.test(clean)) return `${base}${clean}`;
  return `${base}${clean.replace(/\/+$/, '')}/`;
}

export function pad(n: number): string {
  return String(n).padStart(2, '0');
}
