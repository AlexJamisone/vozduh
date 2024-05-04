import { Link } from '@chakra-ui/next-js';
import { Stack, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
dayjs().format();

export default function FooterInfo() {
	return (
		<Stack order={[2, 3]}>
			<Text variant="description" fontSize={['small', null]}>
				Vozduh©️ {dayjs().get('year')}
			</Text>
			<Text variant="description" fontSize={['small', null]}>
				Made by{' '}
				<Link href="https://t.me/alexjamison" target="_blank">
					alexjamison
				</Link>
			</Text>
		</Stack>
	);
}
