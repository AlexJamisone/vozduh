import { DrawerContent } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import Curve from '~/UI/Navigation/Mobile/Curve';
import { menuSlider } from '~/UI/Navigation/Mobile/animation';

export default function DrawerContentComponent({
	children,
}: PropsWithChildren) {
	return (
		<DrawerContent
			as={motion.section}
			position="fixed"
			top={0}
			right={0}
			height="100vh"
			variants={menuSlider}
			animate="enter"
			exit="exit"
			initial="initial"
		>
			<Curve />
			{children}
		</DrawerContent>
	);
}
