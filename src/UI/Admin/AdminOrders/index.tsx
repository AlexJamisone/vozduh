import { Button, Center } from '@chakra-ui/react';
import { useState } from 'react';
import { api } from '~/utils/api';
import AdminOrderCard from './AdminOrderCard';

const AdminOrders = () => {
	const [page, setPage] = useState(0);
	const { data, fetchNextPage } = api.order.getForAdmin.useInfiniteQuery(
		{
			limit: 5,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		}
	);
	const handlFetchNextPage = async () => {
		await fetchNextPage();
		setPage((prev) => prev + 1);
	};
	const toShow = data?.pages[page]?.items;
	return (
		<Center gap={5} mx={5} flexWrap="wrap">
			{toShow?.map((order) => (
				<AdminOrderCard key={order.id} order={order} />
			))}
			<Button onClick={() => void handlFetchNextPage()}>
				Показать ещё 4
			</Button>
		</Center>
	);
};

export default AdminOrders;
