import { Link } from '@chakra-ui/next-js';
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	IconButton,
	Stack,
	useDisclosure,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { RiWindyFill } from 'react-icons/ri';
import NoData from '~/components/NoData';
import TotalSum from '~/components/TotalSum';
import { useCart } from '~/context/cartContext';
import { counterElement } from '~/helpers/counterElement';
import CartItem from './CartItem';

const Cart = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const [countCart, setCountCart] = useState(0);
	const { cart } = useCart();
	useEffect(() => {
		setCountCart(cart.items.length);
	}, [cart.items.length]);
	return (
		<>
			<Stack position="relative">
				<IconButton
					ref={btnRef}
					variant="outline"
					aria-label="cart"
					icon={<Icon as={PiShoppingCartSimpleLight} />}
					onClick={onToggle}
					position="relative"
					{...counterElement(countCart)}
				/>
			</Stack>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				finalFocusRef={btnRef}
				placement="right"
				size={['xs', 'md']}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader textAlign="center">Корзина</DrawerHeader>
					<DrawerCloseButton />
					<DrawerBody px={[1, null]}>
						{cart.items.length === 0 && (
							<NoData
								title="В вашей корзине пусто"
								icon={RiWindyFill}
							/>
						)}
						<AnimatePresence>
							{cart.items.map((item, index) => (
								<CartItem
									key={index}
									item={item}
									index={index}
								/>
							))}
						</AnimatePresence>
					</DrawerBody>
					{cart.items.length !== 0 && (
						<DrawerFooter justifyContent="space-between" gap={5}>
							<TotalSum sum={cart.totalSum} />
							<Button
								w="50%"
								colorScheme="telegram"
								as={Link}
								_hover={{
									textDecoration: 'none',
								}}
								href="/new-order"
								size={['sm', 'md']}
								onClick={onClose}
							>
								Оформить заказ
							</Button>
						</DrawerFooter>
					)}
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Cart;
