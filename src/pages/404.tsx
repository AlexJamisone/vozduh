import { Button, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import AnimataedLayout from '~/components/AnumationLayout';

export default function Custom404() {
	return (
		<AnimataedLayout pt={120} flexDirection="column">
			<video
				src="https://cdnl.iconscout.com/lottie/premium/thumb/404-error-5105684-4282504.mp4"
				muted
				autoPlay
				loop
			/>
			<Stack mt={-20} zIndex={20} position="relative">
				<Text
					as="h1"
					fontSize={['2xl', '4xl']}
					textColor="blackAlpha.700"
					fontFamily="Jost, sans-serif"
				>
					Старница не найдена
				</Text>
				<Button
					as={Link}
					href="/"
					variant="outline"
					colorScheme="blackAlpha"
					rounded="2xl"
				>
					Вернуться к безопасности
				</Button>
			</Stack>
		</AnimataedLayout>
	);
}
