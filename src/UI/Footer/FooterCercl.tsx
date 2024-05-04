import { Box, Stack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import useEndOfPage from '~/hooks/useEndOfPage';

export default function FooterCercl() {
	const isEnd = useEndOfPage();
	return (
		<Stack order={1} position="relative">
			<Box
				border="2px solid"
				width="67px"
				height="67px"
				rounded="full"
				borderColor="whiteAlpha.500"
			/>
			<AnimatePresence>
				{isEnd && (
					<Stack
						as={motion.div}
						layout
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: {
								ease: [0.76, 0, 0.24, 1],
								duration: 0.3,
								stiffness: 150,
							},
						}}
						exit={{
							opacity: 0,
							transition: {
								ease: [0.76, 0, 0.24, 1],
								duration: 0.3,
								stiffness: 150,
								mass: 0.5,
							},
						}}
						position="absolute"
						width={200}
						top={-50}
						left={-75}
						height={150}
						bgGradient="radial(whiteAlpha.800, #121212)"
						filter="blur(15px)"
					/>
				)}
			</AnimatePresence>
		</Stack>
	);
}
