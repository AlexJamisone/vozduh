import { Icon, Stack, Text } from '@chakra-ui/react';
import type { OrderStatus } from '@prisma/client';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { helperStatus } from '~/helpers/helperStatus';
export default function UserOrderStatus({
	viewed,
	status,
}: {
	status: OrderStatus;
	viewed: boolean;
}) {
	return (
		<Stack>
			<Stack direction="row" alignItems="center">
				<Icon
					as={helperStatus(status)?.icon}
					boxSize={4}
					textColor={helperStatus(status)?.color}
				/>
				<Text>{helperStatus(status)?.text}</Text>
			</Stack>
			<Stack direction="row" alignItems="center">
				<Icon
					as={viewed ? AiOutlineEye : AiOutlineEyeInvisible}
					boxSize={4}
				/>
				<Text>{viewed ? 'Просмотренно' : 'Не просмотренно'}</Text>
			</Stack>
		</Stack>
	);
}
