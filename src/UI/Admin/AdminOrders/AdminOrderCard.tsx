import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import type {
	Address,
	Order,
	OrderItem,
	Point,
	Product,
	ProductPriceHistory,
} from '@prisma/client';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import OrderDitailsOrder from './OrderDitailsOrder';

dayjs().locale('ru');

type AdminOrderCardProps = {
	order: Order & {
		orderItem: (OrderItem & {
			product: Product & {
				priceHistory: ProductPriceHistory[];
			};
		})[];
		address: Address & {
			point: Point | null;
		};
	};
};
const AdminOrderCard = ({ order }: AdminOrderCardProps) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	return (
		<Card>
			<CardBody textAlign="center">
				Заказ #{order.orderNumber}
				<Stack textAlign="left">
					<Text>
						Дата создания:{' '}
						{dayjs(order.createdAt).format('DD.MM.YY HH:mm')}
					</Text>
					<Text>
						Покупатель: {order.address.firstName}{' '}
						{order.address.lastName}
					</Text>
					<Text>Телефон: {order.address.contactPhone}</Text>
					<Text>ПВЗ: {order.address.point?.addressFullName}</Text>
				</Stack>
				<Button onClick={onToggle} w="100%">
					Товары
				</Button>
				<OrderDitailsOrder
					numberOrder={order.orderNumber}
					isOpen={isOpen}
					onClose={onClose}
					orderItem={order.orderItem}
				/>
			</CardBody>
			<CardFooter></CardFooter>
		</Card>
	);
};

export default AdminOrderCard;
