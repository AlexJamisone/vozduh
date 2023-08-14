import { Stack, Td, Text, Tr } from '@chakra-ui/react';
import type { OrderItem, Product, ProductPriceHistory } from '@prisma/client';

type OrderStickItemProps = {
	orderItem: OrderItem & {
		product: Product & {
			priceHistory: ProductPriceHistory[];
		};
	};
};

const OrderStickItem = ({ orderItem }: OrderStickItemProps) => {
	return (
		<Tr>
			<Td>
				{orderItem.product.name} x{orderItem.quantity}
			</Td>
			<Td>
				<Stack>
					{orderItem.additionalServiceOption.map((content, index) => (
						<Text key={index} textAlign="left">
							{content}
						</Text>
					))}
					{orderItem.additionalServiceOption.length === 0 && (
						<Text textAlign="center">-</Text>
					)}
				</Stack>
			</Td>
			<Td>
				<Text textAlign="center">{orderItem.size}</Text>
			</Td>
		</Tr>
	);
};

export default OrderStickItem;
