import { Icon, IconButton, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import { PiShoppingCartSimpleLight } from 'react-icons/pi';
const Cart = () => {
	return (
		<Menu>
			<MenuButton
				variant="ghost"
				as={IconButton}
				icon={<Icon as={PiShoppingCartSimpleLight} boxSize={6} />}
			/>
			<MenuList>{/* cart items */}</MenuList>
		</Menu>
	);
};

export default Cart;
