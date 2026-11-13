const ASSET = /\.(png|jpe?g|svg|gif|webp|mp4|webm|mov)$/i;

export async function resolve(specifier, context, next) {
  if (ASSET.test(specifier)) return { url: new URL(specifier, context.parentURL).href, shortCircuit: true };
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (ASSET.test(url)) {
    const name = decodeURIComponent(url.split('/').pop());
    return { format: 'module', source: `export default ${JSON.stringify(name)};`, shortCircuit: true };
  }
  return next(url, context);
}
