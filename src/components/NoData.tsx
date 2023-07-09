import { Icon, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

type NoDataProps = {
	title: string;
	icon: IconType;
};
const NoData = ({ icon, title }: NoDataProps) => {
	return (
		<Stack
			justifyContent="center"
			alignItems="center"
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: { type: 'spring', duration: 0.4 },
			}}
		>
			<Icon as={icon} boxSize={10} color="whiteAlpha.400" />
			<Text fontSize={14} textColor="whiteAlpha.400">
				{title}
			</Text>
		</Stack>
	);
};

export default NoData;
