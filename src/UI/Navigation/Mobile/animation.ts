import type { Transition, Variants } from 'framer-motion';

function transition(i?: number): Transition {
	if (i) {
		return {
			duration: 0.8,
			ease: [0.76, 0, 0.24, 1],
			delay: 0.1 * i,
		};
	}
	return {
		duration: 0.8,
		ease: [0.76, 0, 0.24, 1],
	};
}
export const menuSlider: Variants = {
	initial: {
		x: 'calc(100% + 100px)',
	},
	enter: {
		x: '0%',
		transition: transition(),
	},
	exit: {
		x: 'calc(100% + 100px)',
		transition: transition(),
	},
};

export const slide: Variants = {
	initial: {
		x: '80px',
	},
	enter: (i: number) => ({
		x: '0px',
		transition: transition(i),
	}),
	exit: (i: number) => ({
		x: '80px',
		transition: transition(i),
	}),
};
