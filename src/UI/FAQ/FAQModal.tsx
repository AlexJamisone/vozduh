import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import { useFaq } from '~/store/useFaq';
import FAQAction from './FAQAction';
import FAQInputs from './FAQInputs';

type FAQModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const FAQModal = ({ isOpen, onClose }: FAQModalProps) => {
	const edit = useFaq((state) => state.edit.is);
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
					<FAQInputs />
				</ModalBody>
				<ModalFooter>
					<FAQAction onClose={onClose} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default FAQModal;
