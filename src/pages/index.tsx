import { Image } from '@chakra-ui/next-js';
import { Center, Stack, useColorMode } from '@chakra-ui/react';
import Category from '~/UI/Category';

export default function Home() {
	const { colorMode } = useColorMode();
	return (
		<Stack as={'main'} gap={0} pb={75}>
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
