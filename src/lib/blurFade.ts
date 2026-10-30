import type { CSSProperties } from 'react';

/**
 * CSS port of v3 <BlurFade> (framer-motion, inView=false): plays once on mount.
 * Pair the returned style with the `animate-blur-fade` class.
 */
export function blurFadeStyle({
	delay = 0,
	duration = 0.4,
	yOffset = 6,
}: {
	delay?: number;
	duration?: number;
	yOffset?: number;
}) {
	return {
		'--bf-y': `${yOffset}px`,
		'--bf-duration': `${duration}s`,
		animationDelay: `${0.04 + delay}s`,
	} as CSSProperties;
}
