// Any image dropped into src/assets/logos/ is picked up by its file name (without extension).
const files = import.meta.glob('../../assets/logos/*.{png,svg,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const byKey: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  byKey[name] = url;
}

export function getLogo(key: string): string | undefined {
  return byKey[key];
}
