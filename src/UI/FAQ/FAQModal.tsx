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
	Textarea,
	useToast,
} from '@chakra-ui/react';
import type { Dispatch } from 'react';
import type { AboutState, Action } from '~/reducer/aboutReducer';
import { api } from '~/utils/api';

type FAQModalProps = {
	isOpen: boolean;
	onClose: () => void;
	state: AboutState;
	dispatch: Dispatch<Action>;
};

const FAQModal = ({ isOpen, onClose, dispatch, state }: FAQModalProps) => {
	const {
		mutate: create,
		isLoading: isLoadingCreate,
		isError: isErrorCreate,
		error: errorCreate,
	} = api.faq.create.useMutation();

	const {
		mutate: update,
		isLoading: isLoadingUpdate,
		isError: isErrorUpdate,
		error: errorUpdate,
	} = api.faq.update.useMutation();
	const ctx = api.useContext();
	const toast = useToast();

	const { edit, content, title, id } = state;
	const errorOfCreate = errorCreate?.data?.zodError?.fieldErrors;
	const errorOfUpdate = errorUpdate?.data?.zodError?.fieldErrors;
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>
					{edit ? 'Обновить FAQ' : 'Создать FAQ'}
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl
						isInvalid={
							(isErrorCreate || isErrorUpdate) &&
							(errorOfCreate?.['title'] !== undefined ||
								errorOfUpdate?.['title'] !== undefined)
						}
					>
						<FormLabel>Заголовок\Вопрос</FormLabel>
						<Input
							value={title}
							onChange={(e) =>
								dispatch({
									type: 'SET_ABOUT',
									payload: {
										...state,
										title: e.target.value,
									},
								})
							}
						/>
						<FormErrorMessage>
							{errorOfCreate?.['title'] ||
								errorOfUpdate?.['title']}
						</FormErrorMessage>
					</FormControl>
					<FormControl
						isInvalid={
							(isErrorCreate || isErrorUpdate) &&
							(errorOfCreate?.['content'] !== undefined ||
								errorOfUpdate?.['content'] !== undefined)
						}
					>
						<FormLabel>Контент</FormLabel>
						<Textarea
							value={content}
							onChange={(e) =>
								dispatch({
									type: 'SET_ABOUT',
									payload: {
										...state,
										content: e.target.value,
									},
								})
							}
						/>
						<FormErrorMessage>
							{errorOfCreate?.['content'] ||
								errorOfUpdate?.['content']}
						</FormErrorMessage>
					</FormControl>
				</ModalBody>
				<ModalFooter gap={3}>
					<Button
						colorScheme="red"
						onClick={() => {
							dispatch({ type: 'CLEAR' });
							onClose();
						}}
					>
						Отмена
					</Button>
					<Button
						colorScheme="telegram"
						isLoading={isLoadingCreate || isLoadingUpdate}
						onClick={() => {
							if (edit) {
								update(
									{
										title,
										content: content.split(/\n/g),
										id,
									},
									{
										onSuccess: ({ message, success }) => {
											void ctx.faq.invalidate();
											toast({
												description: message,
												status: success
													? 'info'
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
										content: content.split(/\n/g),
										title,
									},
									{
										onSuccess: ({ message, success }) => {
											void ctx.faq.invalidate();
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
						{edit ? 'Обновить' : 'Создать'}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default FAQModal;
