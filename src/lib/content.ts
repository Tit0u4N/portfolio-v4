import {
	getCollection,
	type CollectionKey,
	type CollectionEntry,
} from 'astro:content';
import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import type { Locale } from '@/i18n/ui';

/** Entries of a collection for one locale (files live in `<collection>/<locale>/`), sorted by `order`. */
export async function getLocalized<C extends CollectionKey>(
	collection: C,
	locale: Locale,
): Promise<CollectionEntry<C>[]> {
	const entries = await getCollection(collection, (e) =>
		e.id.startsWith(`${locale}/`),
	);
	return entries.sort(
		(a, b) =>
			(a.data as { order: number }).order - (b.data as { order: number }).order,
	);
}

/** Optimized URL for an image passed to a React island (islands can't use <Image>). */
export async function imageUrl(src: ImageMetadata, width: number) {
	const img = await getImage({ src, width, format: 'webp' });
	return img.src;
}
