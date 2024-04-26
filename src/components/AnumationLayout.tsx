import { Center, type CenterProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const AnimataedLayout = ({ children, ...props }: CenterProps) => {
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
				},
			}}
			{...props}
		>
			{children}
		</Center>
	);
};

export default AnimataedLayout;
