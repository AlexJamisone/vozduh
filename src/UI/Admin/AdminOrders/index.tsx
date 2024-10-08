import { Center, Spinner, Stack } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import InfiniteScroll from 'react-infinite-scroll-component';
import NoData from '~/components/NoData';
import { api } from '~/utils/api';
import AdminOrderCard from './AdminOrderCard';

const AdminOrders = () => {
	const { data, fetchNextPage, hasNextPage } =
		api.order.getForAdmin.useInfiniteQuery(
			{
				limit: 10,
			},
			{
				getNextPageParam: (lastPage) => lastPage.nextCursor,
			}
		);
	if (!data) return null;
	if (data.pages[0]?.items.length === 0)
		return <NoData icon={AiOutlineUnorderedList} title="Нет заказов" />;
	return (
		<InfiniteScroll
			dataLength={data.pages.reduce(
				(total, page) => total + page.items.length,
				0
			)}
			hasMore={hasNextPage ?? true}
			loader={
				<Center>
					<Spinner />
				</Center>
			}
			next={fetchNextPage}
			style={{
				overflow: 'hidden',
			}}
		>
			<Stack
				direction="row"
				flexWrap="wrap"
				gap={7}
				justifyContent="center"
				overflowY="hidden"
			>
				{data.pages.map((page, index) => (
					<AnimatePresence key={index}>
						{page.items.map((order) => (
							<AdminOrderCard key={order.id} order={order} />
						))}
					</AnimatePresence>
				))}
			</Stack>
		</InfiniteScroll>
	);
};

export default AdminOrders;
