import { Box, Icon, useColorMode } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { pathLogo } from '~/constants/logo';

const Logo = () => {
	const { colorMode } = useColorMode();
	const { scrollYProgress } = useScroll();
	const scroll = useTransform(scrollYProgress, [0, 1], [1, 0]);
	return (
		<Icon
			w={[200, 300]}
			h={[100]}
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			viewBox="0 0 85 28.3"
			xmlSpace="preserve"
			fill={colorMode === 'dark' ? 'white' : undefined}
			transition="all .3s linear"
		>
			{pathLogo.map(({ id, d }, index) => (
				<motion.path
					key={id}
					d={d}
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: {
							type: 'spring',
							duration: 0.4,
							delay: 0.1 * index,
							damping: 100,
						},
					}}
				/>
			))}
			<Box
				as={motion.rect}
				stroke={colorMode === 'dark' ? 'white' : '#121212'}
				transition="all .3s linear"
				strokeMiterlimit={10}
				fill={'none'}
				x="4.8"
				y="4.4"
				width="75.4px"
				height="18.2px"
				initial={{ pathLength: 0 }}
				animate={{
					pathLength: 1,
					transition: { duration: 3, type: 'spring', delay: 0.7 },
				}}
				style={{
					pathLength: scroll,
				}}
			/>
		</Icon>
	);
};

export default Logo;
