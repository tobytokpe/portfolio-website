// Restores protected-src/<projectId>.json from the encrypted bundle, for editing.
// Usage: CASE_PASSWORD='...' node scripts/decrypt-cases.mjs
// Edit the JSON, then run scripts/encrypt-cases.mjs to re-encrypt.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';

const password = process.env.CASE_PASSWORD;
if (!password) { console.error('Set CASE_PASSWORD'); process.exit(1); }

const fromB64 = (s) => Uint8Array.from(Buffer.from(s, 'base64'));
const cases = JSON.parse(readFileSync('src/app/data/protectedCases.json', 'utf8'));
mkdirSync('protected-src', { recursive: true });

for (const [id, enc] of Object.entries(cases)) {
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: fromB64(enc.salt), iterations: enc.iterations, hash: 'SHA-256' },
    base, { name: 'AES-GCM', length: 256 }, false, ['decrypt'],
  );
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: fromB64(enc.iv) }, key, fromB64(enc.ct));
  writeFileSync(`protected-src/${id}.json`, new TextDecoder().decode(plain));
  console.log('Decrypted', id);
}
