import { Stack, useMediaQuery } from '@chakra-ui/react';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Navigation = () => {
	const [isLowerThan1150] = useMediaQuery(['(max-width: 1150px)']);
	return (
		<Stack
			as="header"
			direction="row"
			alignItems="center"
			justifyContent="center"
			position="fixed"
			w="100%"
			zIndex={20}
		>
			{isLowerThan1150 ? <Mobile /> : <Desktop />}
		</Stack>
	);
};

export default Navigation;
