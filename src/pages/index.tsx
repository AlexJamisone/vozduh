import { Image } from '@chakra-ui/next-js';
import { Center, Stack, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Category from '~/UI/Category';
import { api } from '~/utils/api';

export default function Home() {
	api.user.get.useQuery();
	const { colorMode } = useColorMode();
	return (
		<Stack
			as={motion.main}
			initial={{ backgroundColor: 'Menu' }}
			gap={0}
			pb={75}
		>
			<Center as="section" h="100vh" position="relative">
				<Image
					alt="main"
					src={
						colorMode === 'dark'
							? '/assets/darkbg.jpg'
							: '/assets/bg.jpg'
					}
					fill
					quality={100}
				/>
			</Center>
			<Category />
		</Stack>
	);
}
