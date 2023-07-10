import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
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
import { useReducer, useState, type ChangeEvent } from 'react';
import type {
	DaDataAddress,
	DaDataAddressSuggestion,
	DaDataSuggestion,
} from 'react-dadata';
import { IMaskInput } from 'react-imask';
import YandexMap from '~/UI/Maps/YandexMap';
import { addressInput } from '~/constants/address';
import AddressContext from '~/context/addressContext';
import { addressReducer, initial } from '~/reducer/addressReducer';
import { api } from '~/utils/api';
import UserAddressSelectCity from './UserAddressSelectCity';

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
	const handlInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'firstName':
				dispatchAddress({ type: 'SET_FIRSTNAME', payload: value });
				break;
			case 'lastName':
				dispatchAddress({ type: 'SET_LASTNAME', payload: value });
				break;
			case 'phone':
				dispatchAddress({ type: 'SET_PHONE', payload: value });
				break;
			default:
				break;
		}
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
				}}
			>
				<ModalContent>
					<ModalHeader textAlign="center">Новый адрес</ModalHeader>
					<ModalCloseButton />
					<ModalBody as={Stack}>
						{addressInput(address).map(
							({ name, placeholder, value }) => (
								<FormControl
									key={name}
									isInvalid={
										isError &&
										error.data?.zodError?.fieldErrors[
											name
										] !== undefined
									}
								>
									<FormLabel>{placeholder}</FormLabel>
									<Input
										as={IMaskInput}
										mask={
											name === 'phone'
												? '+{7}(000)000-00-00'
												: ''
										}
										type="text"
										value={value}
										placeholder={placeholder}
										onChange={(e) => {
											handlInput(e);
											reset();
										}}
										name={name}
									/>
									<FormErrorMessage fontWeight={600}>
										{
											error?.data?.zodError?.fieldErrors[
												name
											]
										}
									</FormErrorMessage>
								</FormControl>
							)
						)}
						<UserAddressSelectCity />
						{address.map && <YandexMap />}
					</ModalBody>
					<ModalFooter gap={5}>
						<Button
							colorScheme="twitter"
							isLoading={isLoadingCreate}
							onClick={() =>
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
											toast({
												description: `${message}`,
												status: 'success',
												isClosable: true,
												position: 'top-right',
											});
											dispatchAddress({
												type: 'SET_CLEAR',
											});
											onClose();
										},
									}
								)
							}
						>
							Сохранить
						</Button>
						<Button
							onClick={() => {
								dispatchAddress({ type: 'SET_CLEAR' });
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
