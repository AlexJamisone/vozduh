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
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { RiWindyFill } from 'react-icons/ri';
import NoData from '~/components/NoData';
import { useCart } from '~/context/cartContext';
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
					_before={{
						content: `'${countCart}'`,
						width: countCart === 0 ? '0px' : '20px',
						height: countCart === 0 ? '0px' : '20px',
						position: 'absolute',
						bottom: -5,
						right: -5,
						border: '1px solid',
						p: countCart === 0 ? 0 : 0.5,
						rounded: 'full',
						opacity: countCart === 0 ? 0 : 1,
						transition: 'opacity .7s ease-in-out',
					}}
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
						<DrawerFooter gap={5}>
							<Stack
								w={[null, '70%']}
								fontWeight={600}
								fontSize={['md', '2xl']}
								direction="row"
								justifyContent="space-between"
							>
								<Text>Итог:</Text>
								<Text>{cart.totalSum} ₽</Text>
							</Stack>
							<Button
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
