import {
	Children,
	cloneElement,
	forwardRef,
	isValidElement,
	useRef,
	type ReactNode,
} from 'react';
import {
	motion,
	useMotionValue,
	useSpring,
	useTransform,
	type MotionProps,
	type MotionValue,
} from 'motion/react';
import { cn } from '@lib/utils';

const DEFAULT_SIZE = 40;
const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockClasses =
	'bg-white dark:bg-black mx-auto mt-8 h-[62px] w-max flex items-center justify-center gap-2 rounded-2xl border p-4';

export interface DockProps {
	className?: string;
	iconSize?: number;
	iconMagnification?: number;
	iconDistance?: number;
	direction?: 'top' | 'middle' | 'bottom';
	children: ReactNode;
}

export const Dock = forwardRef<HTMLDivElement, DockProps>(
	(
		{
			className,
			children,
			iconSize = DEFAULT_SIZE,
			iconMagnification = DEFAULT_MAGNIFICATION,
			iconDistance = DEFAULT_DISTANCE,
			direction = 'middle',
			...props
		},
		ref,
	) => {
		const mouseX = useMotionValue(Infinity);

		return (
			<motion.div
				ref={ref}
				onMouseMove={(e) => mouseX.set(e.pageX)}
				onMouseLeave={() => mouseX.set(Infinity)}
				{...props}
				className={cn(dockClasses, className, {
					'items-start': direction === 'top',
					'items-center': direction === 'middle',
					'items-end': direction === 'bottom',
				})}
			>
				{Children.map(children, (child) =>
					isValidElement<DockIconProps>(child) && child.type === DockIcon
						? cloneElement(child, {
								mouseX,
								size: iconSize,
								magnification: iconMagnification,
								distance: iconDistance,
							})
						: child,
				)}
			</motion.div>
		);
	},
);

Dock.displayName = 'Dock';

export interface DockIconProps extends Omit<MotionProps, 'children'> {
	size?: number;
	magnification?: number;
	distance?: number;
	mouseX?: MotionValue<number>;
	className?: string;
	children?: ReactNode;
}

export const DockIcon = ({
	size = DEFAULT_SIZE,
	magnification = DEFAULT_MAGNIFICATION,
	distance = DEFAULT_DISTANCE,
	mouseX,
	className,
	children,
	...props
}: DockIconProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const padding = Math.max(6, size * 0.2);
	const defaultMouseX = useMotionValue(Infinity);

	const distanceCalc = useTransform(mouseX ?? defaultMouseX, (val: number) => {
		const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
		return val - bounds.x - bounds.width / 2;
	});

	const sizeTransform = useTransform(
		distanceCalc,
		[-distance, 0, distance],
		[size, magnification, size],
	);

	const scaleSize = useSpring(sizeTransform, {
		mass: 0.1,
		stiffness: 150,
		damping: 12,
	});

	return (
		<motion.div
			ref={ref}
			style={{ width: scaleSize, height: scaleSize, padding }}
			className={cn(
				'flex aspect-square cursor-pointer items-center justify-center rounded-full',
				className,
			)}
			{...props}
		>
			{children}
		</motion.div>
	);
};
