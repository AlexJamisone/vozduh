import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	useToast,
} from '@chakra-ui/react';
import type { Point } from '@prisma/client';
import { motion } from 'framer-motion';
import { useReducer, useState } from 'react';
import type {
	DaDataAddress,
	DaDataAddressSuggestion,
	DaDataSuggestion,
} from 'react-dadata';
import AddressInputs from '~/UI/Address/AddressInputs';
import AddressPointCard from '~/UI/Address/AddressPointCard';
import AddressSelectCity from '~/UI/Address/AddressSelectCity';
import YandexMap from '~/UI/Maps/YandexMap';
import AddressContext from '~/context/addressContext';
import { addressReducer, initial } from '~/reducer/addressReducer';
import { api } from '~/utils/api';

type UserAddressModalProps = {
	isOpen: boolean;
	onClose: () => void;
};
const UserAddressModal = ({ isOpen, onClose }: UserAddressModalProps) => {
	const [address, dispatchAddress] = useReducer(addressReducer, initial);
	const {
		mutate: getPoints,
		data: points,
		isLoading: isLoadingCdek,
	} = api.cdek.getPoints.useMutation();
	const {
		mutate: create,
		isLoading: isLoadingCreate,
		isError,
		error,
		reset,
	} = api.address.create.useMutation();
	const ctx = api.useContext();
	const toast = useToast();

	//have duplication in Order/index.tsx make helper later
	const [valueSuggestion, setValueSuggestion] = useState<
		DaDataAddressSuggestion | undefined
	>();
	const handlPoints = (
		suggestion: DaDataSuggestion<DaDataAddress> | undefined
	) => {
		setValueSuggestion(suggestion);
		getPoints(
			{ city: suggestion?.data.postal_code as string },
			{
				onSuccess: () => {
					dispatchAddress({ type: 'SET_MAP', payload: true });
				},
			}
		);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<AddressContext.Provider
				value={{
					address,
					dispatchAddress,
					valueSuggestion,
					points,
					handlPoints,
					isLoadingCdek,
					isError,
					error: error?.data?.zodError?.fieldErrors,
					reset,
				}}
			>
				<ModalContent as={motion.section} layout>
					<ModalHeader textAlign="center">Новый адрес</ModalHeader>
					<ModalCloseButton />
					<ModalBody as={Stack} gap={3}>
						<AddressInputs />
						<AddressSelectCity />
						<AddressPointCard />
						<YandexMap />
					</ModalBody>
					<ModalFooter gap={5}>
						<Button
							colorScheme="twitter"
							isLoading={isLoadingCreate}
							onClick={() => {
								if (!address.confirmPoint) {
									dispatchAddress({
										type: 'SET_CONFIRM_ERROR',
										payload: true,
									});
									toast({
										description:
											'Подтвердите Пункт выдачи!',
										status: 'warning',
										isClosable: true,
										position: 'top-right',
									});
								} else {
									create(
										{
											firstName: address.firstName,
											lastName: address.lastName,
											phone: address.contactPhone,
											point: address.point as Point,
										},
										{
											onSuccess: ({ message }) => {
												void ctx.address.invalidate();
												void ctx.user.invalidate();
												toast({
													description: `${message}`,
													status: 'success',
													isClosable: true,
													position: 'top-right',
												});
												dispatchAddress({
													type: 'SET_CLEAR',
												});
												setValueSuggestion(undefined);
												onClose();
											},
										}
									);
								}
							}}
						>
							Сохранить
						</Button>
						<Button
							onClick={() => {
								dispatchAddress({ type: 'SET_CLEAR' });
								setValueSuggestion(undefined);
								reset();
								onClose();
							}}
						>
							Отмена
						</Button>
					</ModalFooter>
				</ModalContent>
			</AddressContext.Provider>
		</Modal>
	);
};

export default UserAddressModal;
