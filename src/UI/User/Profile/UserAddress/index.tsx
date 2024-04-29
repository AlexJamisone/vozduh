import {
	Button,
	Card,
	CardBody,
	CardHeader,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegAddressCard } from 'react-icons/fa6';
import NoData from '~/components/NoData';
import { api } from '~/utils/api';
import UserAddressCard from './UserAddressCard';
import UserAddressModal from './UserAddressModal';

const UserAddress = () => {
	const { data: address } = api.address.get.useQuery();
	const { isOpen, onClose, onToggle } = useDisclosure();
	const toast = useToast();
	if (!address) return null;
	return (
		<Card
			as={motion.div}
			layout
			justifyContent="center"
			alignItems="center"
		>
			<CardHeader>
				<Button
					w="100%"
					onClick={() => {
						if (address.length >= 3) {
							toast({
								description:
									'Вы можете хранить максимум 3 адреса; если вы хотите добавить новый, удалите старые.',
								status: 'info',
								duration: 7000,
							});
						} else {
							onToggle();
						}
					}}
				>
					Добавить Адрес
				</Button>
			</CardHeader>
			<CardBody
				maxW="400px"
				justifyContent="center"
				flexWrap="wrap"
				display="flex"
				gap={3}
			>
				{address.length === 0 && (
					<NoData icon={FaRegAddressCard} title="Нет адресов" />
				)}
				<AnimatePresence>
					{address.map((address, index) => (
						<UserAddressCard
							key={address.id}
							address={address}
							index={index}
						/>
					))}
				</AnimatePresence>
				<UserAddressModal isOpen={isOpen} onClose={onClose} />
			</CardBody>
		</Card>
	);
};

export default UserAddress;
