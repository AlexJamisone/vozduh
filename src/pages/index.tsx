import { Image } from '@chakra-ui/next-js';
import { Center, useColorMode } from '@chakra-ui/react';

export default function Home() {
	const { colorMode } = useColorMode();
	return (
		<>
			<Center as="section" w="100%" h="100vh">
				<Image
					alt="main"
					src={
						colorMode === 'dark'
							? '/assets/darkbg.jpg'
							: '/assets/bg.jpg'
					}
					fill={true}
					quality={100}
				/>
			</Center>
		</>
	);
}
