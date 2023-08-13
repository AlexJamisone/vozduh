import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Icon,
	IconButton,
	Image,
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
import { UploadButton } from '@uploadthing/react';
import '@uploadthing/react/styles.css';
import { type ChangeEvent } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { IMaskInput } from 'react-imask';
import { shopInputs } from '~/constants/shop';
import { useOfflineShopContext } from '~/context/offlineShopContext';
import type { OurFileRouter } from '~/server/uploadthing';
import { api } from '~/utils/api';

type OfflineShopModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const OfflineShopModal = ({ isOpen, onClose }: OfflineShopModalProps) => {
	const { dispatch, state } = useOfflineShopContext();
	const {
		mutate: create,
		isLoading: isLoadingCreate,
		error: errorCreate,
		isError: isErrorCreate,
		reset,
	} = api.shop.create.useMutation();

	const {
		mutate: update,
		isLoading: isLoadingUpdate,
		isError: isErrorUpdate,
		error: errorUpdate,
	} = api.shop.update.useMutation();
	const { mutate: deletSinglImg, isLoading: isLoadingDelet } =
		api.product.deletSinglImg.useMutation();

	const ctx = api.useContext();
	const toast = useToast();
	const handlChange = (e: ChangeEvent<HTMLInputElement>) => {
		reset();
		const { value, name } = e.target;
		dispatch({
			type: 'SET_SHOP',
			payload: { ...state, [name]: value },
		});
	};
	const deletImg = () => {
		deletSinglImg(
			{ src: state.image },
			{
				onSuccess: () => {
					toast({
						description: 'Картинка удалена!',
						isClosable: true,
						duration: 2500,
						status: 'info',
					});
				},
			}
		);
	};
	return (
		<Modal
			isOpen={isOpen}
			onClose={() => {
				if (state.image.length !== 0 && !state.shopEdit) deletImg();
				onClose();
				dispatch({ type: 'CLEAR' });
			}}
			closeOnEsc={false}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Новый оффлайн магазин</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{shopInputs(state).map(
						({ id, label, name, placeholder, value }) => (
							<FormControl
								key={id}
								isInvalid={
									isErrorCreate &&
									errorCreate.data?.zodError?.fieldErrors?.[
										name
									] !== undefined
								}
							>
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
								<FormErrorMessage>
									{
										errorCreate?.data?.zodError
											?.fieldErrors?.[name]
									}
								</FormErrorMessage>
							</FormControl>
						)
					)}
					<Stack mt={5}>
						<FormControl
							isInvalid={
								(isErrorCreate &&
									errorCreate.data?.zodError?.fieldErrors?.[
										'image'
									] !== undefined) ||
								(isErrorUpdate &&
									errorUpdate.data?.zodError?.fieldErrors?.[
										'image'
									] !== undefined)
							}
						>
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
							<FormErrorMessage justifyContent="center">
								{
									errorCreate?.data?.zodError?.fieldErrors?.[
										'image'
									]
								}
							</FormErrorMessage>
						</FormControl>
						{state.image.length !== 0 && (
							<Stack position="relative">
								<IconButton
									colorScheme="red"
									position="absolute"
									top={-3}
									right={-3}
									aria-label="delet"
									onClick={() => deletImg()}
									isLoading={isLoadingDelet}
									icon={<Icon as={AiOutlineDelete} />}
								/>
								<Image
									alt="shop"
									src={`https://utfs.io/f/${state.image}`}
									objectFit="cover"
								/>
							</Stack>
						)}
					</Stack>
				</ModalBody>
				<ModalFooter gap={5}>
					<Button
						colorScheme="telegram"
						isLoading={isLoadingCreate || isLoadingUpdate}
						onClick={() => {
							if (state.shopEdit) {
								update(
									{
										id: state.id,
										inputs: { ...state },
									},
									{
										onSuccess: ({ message, success }) => {
											void ctx.shop.invalidate(),
												toast({
													description: message,
													status: success
														? 'success'
														: 'error',
													isClosable: true,
													position: 'top-right',
												});
											dispatch({ type: 'CLEAR' });
											onClose();
										},
									}
								);
							} else {
								create(
									{
										...state,
									},
									{
										onSuccess: ({ message, success }) => {
											void ctx.shop.invalidate();
											toast({
												description: message,
												status: success
													? 'success'
													: 'error',
												isClosable: true,
												position: 'top-right',
											});
											dispatch({ type: 'CLEAR' });
											onClose();
										},
									}
								);
							}
						}}
					>
						{state.shopEdit ? 'Обновить' : 'Сохранить'}
					</Button>
					<Button
						colorScheme="red"
						isLoading={isLoadingDelet}
						onClick={() => {
							if (state.shopEdit) {
								dispatch({ type: 'CLEAR' });
								onClose();
							} else {
								dispatch({
									type: 'CLEAR',
								});
								if (state.image.length !== 0) deletImg();
								onClose();
							}
						}}
					>
						Отмена
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default OfflineShopModal;
