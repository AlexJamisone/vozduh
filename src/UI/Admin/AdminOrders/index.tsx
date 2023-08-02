import { Center, Skeleton } from '@chakra-ui/react';
import { api } from '~/utils/api';
import AdminOrderCard from './AdminOrderCard';

const AdminOrders = () => {
	const { data: orders, isLoading } = api.order.getForAdmin.useQuery();
	return (
		<Center gap={5} mx={5} flexWrap="wrap">
			{orders?.map((order) => (
				<Skeleton key={order.id} isLoaded={!isLoading}>
					<AdminOrderCard order={order} />
				</Skeleton>
			))}
		</Center>
	);
};

export default AdminOrders;
