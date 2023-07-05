import { Center, type CenterProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type AnimataedLayoutProps = {
	children: ReactNode;
	container?: CenterProps;
	delay?: number;
};

const AnimataedLayout = ({
	children,
	container,
	delay,
}: AnimataedLayoutProps) => {
	return (
		<Center
			as={motion.div}
			initial={{
				opacity: 0,
				y: -100,
			}}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					duration: 0.5,
					delay: delay ?? 0.5,
				},
			}}
			{...container}
		>
			{children}
		</Center>
	);
};

export default AnimataedLayout;
