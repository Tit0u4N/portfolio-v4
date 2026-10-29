// Generates dist/_headers (Cloudflare static assets) with a strict CSP.
// Inline scripts (theme init, Astro island bootstrap) are allowed by sha256 hash.
import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

async function* htmlFiles(dir) {
	for (const entry of await readdir(dir, { withFileTypes: true })) {
		const path = join(dir, entry.name);
		if (entry.isDirectory()) yield* htmlFiles(path);
		else if (entry.name.endsWith('.html')) yield path;
	}
}

const hashes = new Set();
for await (const file of htmlFiles(DIST)) {
	const html = await readFile(file, 'utf8');
	for (const [, attrs, body] of html.matchAll(
		/<script\b([^>]*)>([\s\S]*?)<\/script>/g,
	)) {
		if (
			/\bsrc=/.test(attrs) ||
			/type="application\/ld\+json"/.test(attrs) ||
			!body.trim()
		)
			continue;
		hashes.add(
			`'sha256-${createHash('sha256').update(body).digest('base64')}'`,
		);
	}
}

const csp = [
	"default-src 'self'",
	`script-src 'self' ${[...hashes].sort().join(' ')}`,
	// motion & React set inline style attributes
	"style-src 'self' 'unsafe-inline'",
	"img-src 'self' data:",
	"font-src 'self'",
	"connect-src 'self'",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'none'",
	"frame-ancestors 'none'",
	'upgrade-insecure-requests',
].join('; ');

const headers = `/*
  Content-Security-Policy: ${csp}
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin

/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/images/*
  Cache-Control: public, max-age=604800, stale-while-revalidate=86400
`;

await writeFile(join(DIST, '_headers'), headers);
console.log(`_headers written (${hashes.size} inline script hashes)`);
