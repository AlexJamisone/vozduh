import { Td, Tr } from '@chakra-ui/react';
import type {
	AdditionalService,
	AdditionalServiceOption,
	OrderItem,
	Product,
	ProductPriceHistory,
} from '@prisma/client';

type OrderStickItemProps = {
	orderItem: OrderItem & {
		product: Product & {
			priceHistory: ProductPriceHistory[];
		};
		additionalServiceOption:
			| (AdditionalServiceOption & {
					additionalServices: AdditionalService;
			  })
			| null;
	};
};

const OrderStickItem = ({ orderItem }: OrderStickItemProps) => {
	return (
		// <Stack direction="row" justifyContent='space-between'>
		// 	<Text>
		// 		{orderItem.product.name} x{orderItem.quantity}
		// 	</Text>
		// 	<Text>
		// 		{orderItem.additionalServiceOption?.additionalServices.title}:{' '}
		// 		{orderItem.additionalServiceOption?.name}
		// 	</Text>
		// 	<Text>{orderItem.size}</Text>
		// </Stack>
		<Tr>
			<Td>
				{orderItem.product.name} x{orderItem.quantity}
			</Td>
			<Td>
				{orderItem.additionalServiceOption?.additionalServices.title}:{' '}
				{orderItem.additionalServiceOption?.name}
			</Td>
			<Td>{orderItem.size}</Td>
		</Tr>
	);
};

export default OrderStickItem;
