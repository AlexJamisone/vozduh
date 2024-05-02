import { Link } from '@chakra-ui/next-js';
import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerFooter,
	DrawerHeader,
	Icon,
	IconButton,
	useDisclosure,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
import { RiWindyFill } from 'react-icons/ri';
import DrawerContentComponent from '~/components/DrawerContentComponent';
import NoData from '~/components/NoData';
import TotalSum from '~/components/TotalSum';
import { counterElement } from '~/helpers/counterElement';
import { useCart } from '~/store/useCart';
import CartItem from './CartItem';

const Cart = () => {
	const { isOpen, onClose, onToggle } = useDisclosure();
	const btnRef = useRef<HTMLButtonElement | null>(null);
	const cart = useCart();
	return (
		<>
			<IconButton
				ref={btnRef}
				variant="outline"
				aria-label="cart"
				icon={<Icon as={PiShoppingCartSimpleLight} />}
				onClick={onToggle}
				position="relative"
				{...counterElement(cart.items.length)}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				finalFocusRef={btnRef}
				placement="right"
				size={['xs', 'md']}
			>
				<DrawerContentComponent>
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
							<TotalSum sum={cart.total} />
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
				</DrawerContentComponent>
			</Drawer>
		</>
	);
};

export default Cart;
