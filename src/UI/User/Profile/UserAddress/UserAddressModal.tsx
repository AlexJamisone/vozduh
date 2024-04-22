import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import AddressInputs from '~/UI/Address/AddressInputs';
import AddressPointCard from '~/UI/Address/AddressPointCard';
import AddressSelectCity from '~/UI/Address/AddressSelectCity';
import YandexMap from '~/UI/Maps/YandexMap';
import { useAddress } from '~/store/useAddress';
import UserAddressAction from './UserAddressAction';

type UserAddressModalProps = {
	isOpen: boolean;
	onClose: () => void;
};
const UserAddressModal = ({ isOpen, onClose }: UserAddressModalProps) => {
	const show = useAddress((state) => state.controller.showMap);
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent as={motion.section} layout>
				<ModalHeader textAlign="center">Новый адрес</ModalHeader>
				<ModalCloseButton />
				<ModalBody as={Stack} gap={3}>
					<AddressInputs />
					<AddressSelectCity />
					<AddressPointCard />
					{show && <YandexMap />}
				</ModalBody>
				<ModalFooter>
					<UserAddressAction onClose={onClose} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default UserAddressModal;
