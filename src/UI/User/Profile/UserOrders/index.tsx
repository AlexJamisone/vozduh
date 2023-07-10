import {
	Card,
	CardBody,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import 'dayjs/locale/ru';
import { api } from '~/utils/api';
import UserOrderStick from './UserOrderStick';

const UserOrders = () => {
	const { data: orders } = api.order.getForUsers.useQuery();
	if (!orders) return null;
	return (
		<Card>
			<CardBody>
				<TableContainer>
					<Table>
						<TableCaption fontWeight={600} placement="top">
							Заказы
						</TableCaption>
						<Thead>
							<Tr>
								<Th>Дата заказа</Th>
								<Th>Номер</Th>
								<Th>Статус</Th>
								<Th>Товары</Th>
								<Th>Итог</Th>
							</Tr>
						</Thead>
						<Tbody fontSize={12} textAlign="center">
							{orders.map((order) => (
								<UserOrderStick key={order.id} order={order} />
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</CardBody>
		</Card>
	);
};

export default UserOrders;
