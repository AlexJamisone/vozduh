import { Link } from '@chakra-ui/next-js';
import { Center, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const FAQButton = () => {
	return (
		<Stack
			position="fixed"
			left={20}
			bottom={10}
			as={motion.div}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
				transition: {
					type: 'spring',
					duration: 0.5,
				},
			}}
			whileHover={{
				scale: 1.2,
				transition: {
					type: 'spring',
					duration: 0.3,
				},
			}}
			bg="Menu"
			boxShadow="dark-lg"
			rounded="full"
			w={75}
			h={75}
			cursor="pointer"
			align="center"
			alignItems="center"
			justifyContent="center"
		>
			<Center
				_hover={{
					textDecoration: 'none',
				}}
				as={Link}
				href="/faq"
				fontWeight={600}
				w="100%"
				h="100%"
			>
				F.A.Q.
			</Center>
		</Stack>
	);
};

export default FAQButton;
