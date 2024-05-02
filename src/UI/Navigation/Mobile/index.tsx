import { Link } from '@chakra-ui/next-js';
import { Stack } from '@chakra-ui/react';
import Cart from '~/UI/Cart';
import Logo from '~/assets/Logo';
import MobileDrawer from './MobileDrawer';

const Mobile = () => {
	return (
		<Stack
			as="nav"
			direction="row"
			alignItems="center"
			gap={[7, 16]}
			justifyContent="center"
		>
			<Link href="/">
				<Logo />
			</Link>
			<Cart />
			<MobileDrawer />
		</Stack>
	);
};

export default Mobile;
