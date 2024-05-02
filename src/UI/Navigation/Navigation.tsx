import { Stack, useMediaQuery } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Navigation = () => {
	const [isLowerThan1150] = useMediaQuery(['(max-width: 1150px)'], {
		ssr: true,
	});
	const [showBg, setShowBg] = useState(false);

	useEffect(() => {
		const handlScroll = () => {
			if (window.scrollY >= 50) {
				setShowBg(true);
			} else {
				setShowBg(false);
			}
		};
		window.addEventListener('scroll', handlScroll);
		return () => {
			window.removeEventListener('scroll', handlScroll);
		};
	}, []);
	return (
		<Stack
			as="header"
			direction="row"
			alignItems="center"
			justifyContent="center"
			position="fixed"
			bg={showBg ? 'Menu' : undefined}
			transition="all 0.5s ease-in-out"
			w="100%"
			zIndex={99}
		>
			{isLowerThan1150 ? <Mobile /> : <Desktop />}
		</Stack>
	);
};

export default Navigation;
