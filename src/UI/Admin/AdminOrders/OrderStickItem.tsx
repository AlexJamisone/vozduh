import { Td, Tr } from '@chakra-ui/react';
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
			<Td>{orderItem.additionalServiceOption}</Td>
			<Td>{orderItem.size}</Td>
		</Tr>
	);
};

export default OrderStickItem;
