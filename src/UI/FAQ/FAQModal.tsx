import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useReducer } from 'react';
import { aboutReducer, initialState } from '~/reducer/aboutReducer';

type FAQModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const FAQModal = ({ isOpen, onClose }: FAQModalProps) => {
	const [state, dispatch] = useReducer(aboutReducer, initialState);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Новый вопрос</ModalHeader>
				<ModalCloseButton />
				<ModalBody></ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default FAQModal;
