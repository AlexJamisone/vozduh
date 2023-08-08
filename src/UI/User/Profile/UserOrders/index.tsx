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
import { AnimatePresence } from 'framer-motion';
import { api } from '~/utils/api';
import UserOrderStick from './UserOrderStick';

const UserOrders = () => {
	const { data: orders } = api.order.getForUsers.useQuery();
	if (!orders) return null;
	return (
		<Card>
			<CardBody>
				<TableContainer maxH={550} overflowY="auto">
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
							<AnimatePresence>
								{orders.map((order, index) => (
									<UserOrderStick
										index={index}
										key={order.id}
										order={order}
									/>
								))}
							</AnimatePresence>
						</Tbody>
					</Table>
				</TableContainer>
			</CardBody>
		</Card>
	);
};

export default UserOrders;
