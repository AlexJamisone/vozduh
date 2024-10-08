import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Table,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react';
import type { OrderItem, Product } from '@prisma/client';
import OrderStickItem from './OrderStickItem';

type OrderDitailsProps = {
	orderItem: (OrderItem & {
		product: Product;
	})[];
	isOpen: boolean;
	onClose: () => void;
	numberOrder: number;
};

const OrderDitailsOrder = ({
	orderItem,
	isOpen,
	onClose,
	numberOrder,
}: OrderDitailsProps) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign="center">
					Заказ №{numberOrder}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<TableContainer>
						<Table variant="striped" size="sm">
							<Thead>
								<Tr>
									<Th>Изделие</Th>
									<Th>Доп Услуги</Th>
									<Th>Размер</Th>
								</Tr>
							</Thead>
							<Tbody>
								{orderItem.map((item) => (
									<OrderStickItem
										key={item.id}
										orderItem={item}
									/>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default OrderDitailsOrder;
