import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	IconButton,
	useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
const Cart = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement | null>(null);
	return (
		<>
			<IconButton
				ref={btnRef}
				variant="outline"
				aria-label="cart"
				icon={<Icon as={PiShoppingCartSimpleLight} />}
				onClick={onToggle}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				finalFocusRef={btnRef}
				placement="right"
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader textAlign="center">Корзина</DrawerHeader>
					<DrawerCloseButton />
					<DrawerBody></DrawerBody>
					<DrawerFooter></DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Cart;
