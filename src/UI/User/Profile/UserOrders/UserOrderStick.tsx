import { Icon, Stack, Td, Text, Tr } from '@chakra-ui/react';
import type { Order, OrderItem, Product } from '@prisma/client';
import dayjs from 'dayjs';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { status as statusHelper } from '~/helpers/status';
dayjs.locale('ru');

type UserOrderStickProps = {
	order: Order & {
		orderItem: (OrderItem & { product: Product })[];
	};
};

const UserOrderStick = ({ order }: UserOrderStickProps) => {
	const { createdAt, id, orderItem, orderNumber, status, totalSum, viewed } =
		order;
	return (
		<Tr key={id} textAlign="center">
			<Td>{dayjs(createdAt).format('DD.MM.YYYY HH:mm')}</Td>
			<Td>№ {orderNumber}</Td>
			<Td>
				<Stack direction="row" alignItems="center">
					<Icon
						as={statusHelper(status)?.icon}
						boxSize={4}
						textColor={statusHelper(status)?.color}
					/>
					<Text>{statusHelper(status)?.text}</Text>
				</Stack>
				<Stack direction="row" alignItems="center">
					<Icon
						as={viewed ? AiOutlineEye : AiOutlineEyeInvisible}
						boxSize={4}
					/>
					<Text>{viewed ? 'Просмотренно' : 'Не просмотренно'}</Text>
				</Stack>
			</Td>
			<Td>
				<Stack>
					{orderItem.map(({ id, product: { name }, quantity }) => (
						<Text key={id}>
							{name} x{quantity}
						</Text>
					))}
				</Stack>
			</Td>
			<Td>{totalSum} ₽</Td>
		</Tr>
	);
};

export default UserOrderStick;
