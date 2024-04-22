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
	Textarea,
} from '@chakra-ui/react';
import FAQAction from './FAQAction';

type FAQModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const FAQModal = ({ isOpen, onClose }: FAQModalProps) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			closeOnEsc={false}
			isCentered
			motionPreset="slideInBottom"
		>
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
							placeholder="Придумай заголовок\вопрос"
							value={title}
							onChange={(e) => {
								void resetCreate() || void resetUpdate();
								dispatch({
									type: 'SET_ABOUT',
									payload: {
										...state,
										title: e.target.value,
									},
								});
							}}
						/>
						<FormErrorMessage>
							{errorOfCreate?.['title'] ||
								errorOfUpdate?.['title']}
						</FormErrorMessage>
					</FormControl>
					<FormControl
						isInvalid={
							(isErrorCreate || isErrorUpdate) &&
							(errorOfCreate?.['content']?.[0] !== undefined ||
								errorOfUpdate?.['content']?.[0] !== undefined)
						}
					>
						<FormLabel>Контент</FormLabel>
						<Textarea
							h={150}
							placeholder="Напиши ответ на вопрос"
							value={content}
							onChange={(e) => {
								void resetCreate() || void resetUpdate();
								dispatch({
									type: 'SET_ABOUT',
									payload: {
										...state,
										content: e.target.value,
									},
								});
							}}
						/>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<FAQAction onClose={onClose} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default FAQModal;
