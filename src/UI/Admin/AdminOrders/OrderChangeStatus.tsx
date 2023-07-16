import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import type { OrderStatus } from '@prisma/client';
import { api } from '~/utils/api';

type OrderChangeStatusProps = {
	status: OrderStatus;
};
const OrderChangeStatus = ({ status }: OrderChangeStatusProps) => {
	const { mutate: changeStatus, isLoading } =
		api.order.changeStatus.useMutation();
	return (
		<RadioGroup
			value={status}
			onChange={() =>
				changeStatus({
					status,
					orderId: '',
				})
			}
		>
			<Stack>
				<Radio value="PENDING">В обработке</Radio>
				<Radio value="PROCESSING">В пути</Radio>
				<Radio value="COMPLETED">Доставлен</Radio>
				<Radio value="CANCELED">Отменен</Radio>
			</Stack>
		</RadioGroup>
	);
};

export default OrderChangeStatus;
