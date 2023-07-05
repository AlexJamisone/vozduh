import { Stack, useMediaQuery } from '@chakra-ui/react';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Navigation = () => {
	const [isLowerThan768] = useMediaQuery(['(max-width: 768px)']);
	return (
		<Stack
			as="header"
			direction="row"
			alignItems="center"
			justifyContent="center"
			position="relative"
		>
			{isLowerThan768 ? <Mobile /> : <Desktop />}
		</Stack>
	);
};

export default Navigation;
