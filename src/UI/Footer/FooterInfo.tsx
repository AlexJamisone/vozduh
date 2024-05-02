import { Link } from '@chakra-ui/next-js';
import { Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
dayjs().format();

export default function FooterInfo() {
	return (
		<Stack>
			<Text variant="description">Vozduh©️ {dayjs().get('year')}</Text>
			<Text variant="description">
				Made by <Link href="https://t.me/alexjamison">alexjamison</Link>
			</Text>
		</Stack>
	);
}
