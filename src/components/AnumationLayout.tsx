import { Center, type CenterProps } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const AnimataedLayout = ({ children, ...props }: CenterProps) => {
	const { isSignedIn } = useAuth();
	return (
		<Center
			as={motion.div}
			pt={[110, 150]}
			pb={[isSignedIn ? 70 : 20]}
			initial={{
				opacity: 0,
				y: -100,
			}}
			animate={{
				opacity: 1,
				y: 0,
				transition: {
					type: 'spring',
					duration: 0.5,
				},
			}}
			{...props}
		>
			{children}
		</Center>
	);
};

export default AnimataedLayout;
