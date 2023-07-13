import { Stack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';

const Overlay = () => {
	return (
		<AnimatePresence>
			<Stack
				w="100%"
				h="100%"
				position="absolute"
				bgColor="whiteAlpha.500"
				cursor="not-allowed"
				zIndex={20}
				rounded="2xl"
				as={motion.div}
				layout
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { type: 'spring', duration: 0.7 },
				}}
				exit={{
					opacity: 0,
					transition: {
						type: 'spring',
						duration: 0.5,
					},
				}}
			/>
		</AnimatePresence>
	);
};

export default Overlay;
