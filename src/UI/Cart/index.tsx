import {
	Button,
	Divider,
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
import { useRef } from 'react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { RiWindyFill } from 'react-icons/ri';
import NoData from '~/components/NoData';
import { useCart } from '~/context/cartContext';
import CartItem from './CartItem';

const Cart = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const { cart } = useCart();
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
						content: `'${cart.items.length}'`,
						width: cart.items.length === 0 ? '0px' : '20px',
						height: cart.items.length === 0 ? '0px' : '20px',
						position: 'absolute',
						bottom: -5,
						right: -5,
						border: '1px solid',
						p: cart.items.length === 0 ? 0 : 0.5,
						rounded: 'full',
						opacity: cart.items.length === 0 ? 0 : 1,
						transition: 'opacity .7s ease-in-out',
					}}
				/>
			</Stack>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				finalFocusRef={btnRef}
				placement="right"
				size={['md']}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader textAlign="center">Корзина</DrawerHeader>
					<DrawerCloseButton />
					<DrawerBody>
						{cart.items.length === 0 && (
							<NoData
								title="В вашей корзине пусто"
								icon={RiWindyFill}
							/>
						)}
						{cart.items.map((item, index) => (
							<Stack key={index}>
								<CartItem item={item} />
								<Divider />
							</Stack>
						))}
					</DrawerBody>
					{cart.items.length !== 0 && (
						<DrawerFooter gap={5}>
							<Stack
								w="70%"
								fontWeight={600}
								fontSize="2xl"
								direction="row"
								justifyContent="space-between"
							>
								<Text>Итог:</Text>
								<Text>{cart.totalSum} ₽</Text>
							</Stack>
							<Button>Оформить заказ</Button>
						</DrawerFooter>
					)}
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Cart;
