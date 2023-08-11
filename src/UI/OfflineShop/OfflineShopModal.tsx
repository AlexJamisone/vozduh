import {
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
} from '@chakra-ui/react';
import { UploadButton } from '@uploadthing/react';
import '@uploadthing/react/styles.css';
import { useCallback, useReducer, type ChangeEvent } from 'react';
import { IMaskInput } from 'react-imask';
import { shopInputs } from '~/constants/shop';
import { initial, shopReducer } from '~/reducer/shopReducer';
import type { OurFileRouter } from '~/server/uploadthing';
import { api } from '~/utils/api';

type OfflineShopModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const OfflineShopModal = ({ isOpen, onClose }: OfflineShopModalProps) => {
	const [state, dispatch] = useReducer(shopReducer, initial);
	const { mutate: create } = api.shop.create.useMutation();
	const handlChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { value, name } = e.target;
			dispatch({
				type: 'SET_SHOP',
				payload: { ...state, [name]: value },
			});
		},
		[state]
	);
	// const handlClick = () => {};
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Новый оффлайн магазин</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{shopInputs(state).map(
						({ id, label, name, placeholder, value }) => (
							<FormControl key={id}>
								<FormLabel>{label}</FormLabel>
								<Input
									as={
										name === 'phone'
											? IMaskInput
											: undefined
									}
									mask={
										name === 'phone'
											? `+${7}(000)000-00-00`
											: undefined
									}
									name={name}
									placeholder={placeholder}
									value={value}
									onChange={(e) => handlChange(e)}
								/>
								<FormErrorMessage>{}</FormErrorMessage>
							</FormControl>
						)
					)}
					<UploadButton<OurFileRouter>
						endpoint="signlUploader"
						onClientUploadComplete={(res) =>
							dispatch({
								type: 'SET_SHOP',
								payload: {
									...state,
									image: res?.[0]?.fileKey ?? '',
								},
							})
						}
					/>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default OfflineShopModal;
