import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import type {
	Address,
	Order,
	OrderItem,
	OrderStatus,
	Point,
	Product,
	ProductPriceHistory,
} from '@prisma/client';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { api } from '~/utils/api';
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
	const { mutate: changeStatus, isLoading } =
		api.order.changeStatus.useMutation();
	const ctx = api.useContext();
	return (
		<Card size="sm" maxW={350}>
			<CardBody textAlign="center">
				Заказ #{order.orderNumber}
				<Stack textAlign="left" gap={3}>
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
			<CardFooter justifyContent="space-between">
				<RadioGroup
					onChange={(value) =>
						changeStatus(
							{
								orderId: order.id,
								status: value as OrderStatus,
							},
							{
								onSuccess: () => {
									void ctx.order.invalidate();
								},
							}
						)
					}
					value={order.status}
				>
					<Stack>
						<Radio value="PENDING">В обработке</Radio>
						<Radio colorScheme="green" value="PROCESSING">
							В доставке
						</Radio>
						<Radio colorScheme="teal" value="COMPLETED">
							Доставлен
						</Radio>
						<Radio colorScheme="red" value="CANCELLED">
							Отменен
						</Radio>
					</Stack>
				</RadioGroup>
				{isLoading && <Spinner />}
			</CardFooter>
		</Card>
	);
};

export default AdminOrderCard;
