// Encrypts protected case study content so it only ships as ciphertext.
// Usage: CASE_PASSWORD='...' node scripts/encrypt-cases.mjs
// Plaintext lives in protected-src/<projectId>.json (gitignored, keep it locally).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';

const password = process.env.CASE_PASSWORD;
if (!password) { console.error('Set CASE_PASSWORD'); process.exit(1); }

const ITERATIONS = 250000;
const b64 = (buf) => Buffer.from(buf).toString('base64');

async function encrypt(plaintext) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['encrypt'],
  );
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext));
  return { salt: b64(salt), iv: b64(iv), ct: b64(ct), iterations: ITERATIONS };
}

const out = {};
for (const file of readdirSync('protected-src').filter((f) => f.endsWith('.json')).sort()) {
  out[file.replace('.json', '')] = await encrypt(readFileSync(`protected-src/${file}`, 'utf8'));
}
writeFileSync('src/app/data/protectedCases.json', JSON.stringify(out) + '\n');
console.log('Encrypted:', Object.keys(out).join(', '));
