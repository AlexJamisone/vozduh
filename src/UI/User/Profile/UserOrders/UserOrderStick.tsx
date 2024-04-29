import { Td, Tr } from '@chakra-ui/react';
import type { Order, OrderItem, Product } from '@prisma/client';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import UserOrderProduct from './UserOrderProduct';
import UserOrderStatus from './UserOrderStatus';
dayjs.locale('ru');

type UserOrderStickProps = {
	order: Order & {
		orderItem: (OrderItem & { product: Product })[];
		address: {
			point: string;
		};
	};
	index: number;
};

const UserOrderStick = ({ order, index }: UserOrderStickProps) => {
	const { createdAt, orderItem, orderNumber, status, total, viewed } =
		order;
	return (
		<Tr
			textAlign="center"
			as={motion.tr}
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					type: 'spring',
					duration: 0.3 * index,
					delay: 0.1 * index,
				},
			}}
		>
			<Td>{dayjs(createdAt).format('DD.MM.YYYY HH:mm')}</Td>
			<Td>№ {orderNumber}</Td>
			<Td>
				<UserOrderStatus status={status} viewed={viewed} />
			</Td>
			<Td>
				<UserOrderProduct
                    orderNum={orderNumber}
					orderItem={orderItem}
					total={total}
					point={order.address.point}
				/>
			</Td>
			<Td>{total} ₽</Td>
		</Tr>
	);
};

export default UserOrderStick;
