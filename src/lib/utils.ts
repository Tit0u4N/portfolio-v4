import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function hasParentWithAttribute(
	element: HTMLElement,
	attribute: string,
): boolean {
	while (element) {
		if (element.getAttribute(attribute)) {
			return true;
		}
		element = element.parentElement as HTMLElement;
	}
	return false;
}
