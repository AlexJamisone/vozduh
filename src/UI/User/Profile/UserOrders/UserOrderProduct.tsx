import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogCloseButton,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	Icon,
	IconButton,
	Stack,
	Tag,
	Text,
	VStack,
	useDisclosure,
} from '@chakra-ui/react';
import type { OrderItem, Product } from '@prisma/client';
import { useRef } from 'react';
import { FiList } from 'react-icons/fi';
import TotalSum from '~/components/TotalSum';

export default function UserOrderProduct({
	orderItem,
	point,
	total,
	orderNum,
}: {
	orderItem: (OrderItem & { product: Product })[];
	orderNum: number;
	point: string;
	total: number;
}) {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const cancelRef = useRef<HTMLButtonElement | null>(null);
	return (
		<>
			<IconButton
				aria-label="ditails-product"
				icon={<Icon as={FiList} />}
				onClick={onToggle}
				isRound
				size="sm"
				variant="outline"
			/>
			<AlertDialog
				isOpen={isOpen}
				onClose={onClose}
				leastDestructiveRef={cancelRef}
				isCentered
				motionPreset="slideInBottom"
			>
				<AlertDialogOverlay />
				<AlertDialogContent>
					<AlertDialogCloseButton />
					<AlertDialogHeader textAlign="center">
						Заказ #{orderNum}
					</AlertDialogHeader>
					<AlertDialogBody>
						<Stack alignItems="center" w="100%">
							{orderItem.map((item) => (
								<Stack
									key={item.id}
									direction="row"
									alignItems="center"
									p={3}
									boxShadow="md"
									rounded="2xl"
									w="100%"
									justifyContent="space-between"
								>
									<VStack>
										<Text fontWeight={600}>
											{item.product.name}
										</Text>
										<VStack>
											{item.additionalServiceOption.map(
												(option, idx) => (
													<Text
														key={idx}
														fontSize="smaller"
													>
														{option}
													</Text>
												)
											)}
										</VStack>
									</VStack>
									<Text>{item.quantity} шт.</Text>
									<VStack>
										<Text fontSize="small">Размер</Text>
										<Tag>{item.size}</Tag>
									</VStack>
									<Text>
										{item.product.price.toLocaleString(
											'ru-RU'
										)}{' '}
										₽
									</Text>
								</Stack>
							))}
							<TotalSum sum={total} />
						</Stack>
					</AlertDialogBody>
					<AlertDialogFooter flexDirection="column" gap={4}>
						<VStack>
							<Text textAlign="center" fontWeight={600}>
								Доставка
							</Text>
							<Text textAlign="center">{point}</Text>
						</VStack>
						<Button onClick={onClose} w="100%">
							Вернуться
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
