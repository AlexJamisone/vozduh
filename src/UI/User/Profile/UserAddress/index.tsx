import { Button, Card, CardBody, CardHeader } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRegAddressCard } from 'react-icons/fa6';
import NoData from '~/components/NoData';
import { api } from '~/utils/api';
import UserAddressCard from './UserAddressCard';

const UserAddress = () => {
	const { data: address } = api.address.get.useQuery();
	if (!address) return null;
	return (
		<Card as={motion.div} layout>
			<CardHeader>
				<Button w="100%">Добавить Адрес</Button>
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
			</CardBody>
		</Card>
	);
};

export default UserAddress;
