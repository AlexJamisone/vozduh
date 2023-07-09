import {
	Card,
	CardBody,
	Icon,
	IconButton,
	Text,
	useToast,
} from '@chakra-ui/react';
import type { Address, Point } from '@prisma/client';
import { motion } from 'framer-motion';
import { AiOutlineDelete } from 'react-icons/ai';
import { api } from '~/utils/api';

type UserAddressCardProps = {
	address: Address & {
		point: Point | null;
	};
	index: number;
};

const UserAddressCard = ({ address, index }: UserAddressCardProps) => {
	const { mutate: archiveAddress, isLoading } =
		api.address.archive.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	return (
		<Card
			// w={['100%', '45%']}
			position="relative"
			as={motion.div}
			layout
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { type: 'spring', duration: 0.2 * index },
			}}
			exit={{ opacity: 0 }}
		>
			<IconButton
				aria-label="delet-address"
				position="absolute"
				size="xs"
				top={3}
				right={3}
				colorScheme="red"
				icon={<Icon as={AiOutlineDelete} />}
				isLoading={isLoading}
				onClick={() =>
					archiveAddress(
						{ id: address.id },
						{
							onSuccess: () => {
								void ctx.address.invalidate();
								toast({
									description: 'Адрес успешно удалён.',
									isClosable: true,
									position: 'top-right',
									status: 'info',
								});
							},
							onError: ({ message }) => {
								toast({
									description: `${message}`,
									status: 'error',
									isClosable: true,
									position: 'top-right',
								});
							},
						}
					)
				}
			/>
			<CardBody fontSize={12}>
				<Text>Имя: {address.firstName}</Text>
				<Text>Фамилия: {address.lastName}</Text>
				<Text>Телефон: {address.contactPhone}</Text>
				<Text>ПВЗ: {address.point?.addressFullName}</Text>
			</CardBody>
		</Card>
	);
};

export default UserAddressCard;
