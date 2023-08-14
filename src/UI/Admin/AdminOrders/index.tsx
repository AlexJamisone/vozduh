import { Center, Spinner, Stack } from '@chakra-ui/react';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
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
					<React.Fragment key={index}>
						{page.items.map((order) => (
							<AdminOrderCard order={order} key={order.id} />
						))}
					</React.Fragment>
				))}
			</Stack>
		</InfiniteScroll>
	);
};

export default AdminOrders;
