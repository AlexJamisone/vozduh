import { useColorMode } from '@chakra-ui/react';
import { motion, type Variants } from 'framer-motion';

export default function Curve() {
	const { colorMode } = useColorMode();
	const initialPath = `M100 0 L100 ${window.innerHeight} Q0 ${
		window.innerHeight / 2
	} 100 0`;

	const targetPath = `M100 0 L100 ${window.innerHeight} Q100 ${
		window.innerHeight / 2
	} 100 0`;
	const pathAnimation: Variants = {
		initial: {
			d: initialPath,
		},
		enter: {
			d: targetPath,
			transition: {
				duration: 0.8,
				ease: [0.76, 0, 0.24, 1],
			},
		},
		exit: {
			d: initialPath,
			transition: {
				duration: 0.8,
				ease: [0.76, 0, 0.24, 1],
			},
		},
	};
	return (
		<svg
			style={{
				position: 'absolute',
				top: 0,
				left: '-99px',
				width: '100px',
				height: '100%',
				fill: colorMode === 'light' ? '#fff' : '#2d3748',
				stroke: 'none',
			}}
		>
			<motion.path
				variants={pathAnimation}
				initial="initial"
				animate="enter"
				exit="exit"
			></motion.path>
		</svg>
	);
}
