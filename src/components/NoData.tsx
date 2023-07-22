import { Icon, Stack, Text, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';

type NoDataProps = {
	title: string;
	icon: IconType;
};
const NoData = ({ icon, title }: NoDataProps) => {
	const { colorMode } = useColorMode();
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
			<Icon
				as={icon}
				boxSize={10}
				color={
					colorMode === 'dark' ? 'whiteAlpha.400' : 'blackAlpha.600'
				}
			/>
			<Text
				fontSize={14}
				textColor={
					colorMode === 'dark' ? 'whiteAlpha.400' : 'blackAlpha.600'
				}
			>
				{title}
			</Text>
		</Stack>
	);
};

export default NoData;
