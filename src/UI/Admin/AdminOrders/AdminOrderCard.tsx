import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Icon,
	IconButton,
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import type {
	Address,
	Order,
	OrderItem,
	OrderStatus,
	Point,
	Product,
	ProductPriceHistory,
} from '@prisma/client';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { AnimatePresence, motion } from 'framer-motion';
import { BsEye } from 'react-icons/bs';
import HighlightPhrase from '~/components/HighlightPhrase';
import TotalSum from '~/components/TotalSum';
import { api } from '~/utils/api';
import OrderDitailsOrder from './OrderDitailsOrder';

dayjs().locale('ru');

type AdminOrderCardProps = {
	order: Order & {
		orderItem: (OrderItem & {
			product: Product & {
				priceHistory: ProductPriceHistory[];
			};
		})[];
		address: Address & {
			point: Point | null;
		};
	};
};
const AdminOrderCard = ({ order }: AdminOrderCardProps) => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const { mutate: changeStatus, isLoading } =
		api.order.changeStatus.useMutation();
	const { mutate: changeView, isLoading: isLoadingChangeView } =
		api.order.changeView.useMutation();
	const { mutate: changePay, isLoading: isLoadedPay } =
		api.order.changePay.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	return (
		<Card
			size="sm"
			maxW={350}
			rounded="2xl"
			as={motion.div}
			layout
			initial={{ opacity: 0 }}
			whileInView={{
				opacity: 1,
				transition: {
					type: 'spring',
					duration: 0.3,
					stiffness: 50,
				},
			}}
		>
			<CardHeader textAlign="center" fontSize="xl" position="relative">
				Заказ #{order.orderNumber}
				<AnimatePresence>
					{!order.viewed && (
						<IconButton
							as={motion.button}
							initial={{ opacity: 0 }}
							animate={{
								opacity: 1,
								transition: {
									type: 'spring',
									duration: 0.5,
								},
							}}
							exit={{
								opacity: 0,
								transition: {
									type: 'spring',
									duration: 0.5,
									stiffness: 50,
								},
							}}
							isLoading={isLoadingChangeView}
							onClick={() =>
								changeView(
									{
										orderId: order.id,
									},
									{
										onSuccess: ({ message }) => {
											void ctx.order.invalidate();
											toast({
												description: message,
												status: 'info',
												isClosable: true,
												duration: 2000,
												position: 'top-right',
											});
										},
									}
								)
							}
							aria-label="watch"
							size="sm"
							mx="auto"
							position="absolute"
							right={5}
							variant="outline"
							icon={<Icon as={BsEye} />}
						/>
					)}
				</AnimatePresence>
				<Button
					size="sm"
					position="absolute"
					left={3}
					colorScheme={order.isPayed ? 'green' : 'red'}
					transition="all .5s ease-in-out"
					isDisabled={order.isPayed}
					isLoading={isLoadedPay}
					onClick={() =>
						changePay(
							{
								orderId: order.id,
							},
							{
								onSuccess: ({ message }) => {
									void ctx.order.invalidate();
									toast({
										description: message,
										status: 'info',
										isClosable: true,
										duration: 2500,
										position: 'top-right',
									});
								},
								onError: ({ message }) => {
									toast({
										description: message,
										status: 'error',
										isClosable: true,
										position: 'top-right',
									});
								},
							}
						)
					}
				>
					{order.isPayed ? 'Оплачено' : 'Не оплачено'}
				</Button>
			</CardHeader>
			<CardBody textAlign="center">
				<Stack gap={3} mb={3}>
					<HighlightPhrase
						title="Дата создания:"
						text={dayjs(order.createdAt).format('DD.MM.YY HH:mm')}
					/>
					<HighlightPhrase
						title="Покупатель:"
						text={`${order.address.firstName} ${order.address.lastName}`}
					/>
					<HighlightPhrase
						title="Телефон:"
						text={order.address.contactPhone}
					/>
					<HighlightPhrase
						title="ПВЗ:"
						text={order.address.point?.addressFullName ?? ''}
					/>
				</Stack>
				<Button
					rounded="2xl"
					size={['sm', 'md']}
					onClick={onToggle}
					w="100%"
				>
					Товары
				</Button>
				<OrderDitailsOrder
					numberOrder={order.orderNumber}
					isOpen={isOpen}
					onClose={onClose}
					orderItem={order.orderItem}
				/>
				<TotalSum sum={order.totalSum} />
			</CardBody>
			<CardFooter justifyContent="space-between">
				<RadioGroup
					onChange={(value) =>
						changeStatus(
							{
								orderId: order.id,
								status: value as OrderStatus,
							},
							{
								onSuccess: () => {
									void ctx.order.invalidate();
								},
							}
						)
					}
					value={order.status}
				>
					<Stack>
						<Radio value="PENDING">В обработке</Radio>
						<Radio colorScheme="green" value="PROCESSING">
							В доставке
						</Radio>
						<Radio colorScheme="teal" value="COMPLETED">
							Доставлен
						</Radio>
						<Radio colorScheme="red" value="CANCELLED">
							Отменен
						</Radio>
					</Stack>
				</RadioGroup>
				{isLoading && <Spinner />}
			</CardFooter>
		</Card>
	);
};

export default AdminOrderCard;
