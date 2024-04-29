import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from '@chakra-ui/react';
import '@uploadthing/react/styles.css';
import { useOfflineShop } from '~/store/useOfflineShop';
import { api } from '~/utils/api';
import OfflineAction from './OfflineAction';
import OfflineImage from './OfflineImage';
import OfflineInputs from './OfflineInputs';

type OfflineShopModalProps = {
	isOpen: boolean;
	onClose: () => void;
};

const OfflineShopModal = ({ isOpen, onClose }: OfflineShopModalProps) => {
	const { mutate: deletSinglImg } = api.product.deletSinglImg.useMutation();
	const image = useOfflineShop((state) => state.image);
	function handlClose() {
		if (!image) {
			onClose();
			return;
		}
		deletSinglImg(image);
		onClose();
	}
	return (
		<Modal isOpen={isOpen} onClose={handlClose} closeOnEsc={false}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Новый оффлайн магазин</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<OfflineInputs />
					<OfflineImage />
				</ModalBody>
				<ModalFooter>
					<OfflineAction onClose={onClose} />
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default OfflineShopModal;
