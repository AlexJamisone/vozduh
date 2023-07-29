import { Stack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCreateAddressContext } from '~/context/addressContext';
import Maps from './Maps';
import YandexProvider from './YandexProvider';
type YandexMapProps = {
	width?: number;
	height?: number;
};

const YandexMap = ({ height, width }: YandexMapProps) => {
	const { address } = useCreateAddressContext();
	return (
		<AnimatePresence>
			{address.map && (
				<Stack
					as={motion.div}
					layout
					initial={{
						opacity: 0,
						y: 50,
						filter: 'blur(5px)',
					}}
					animate={{
						opacity: 1,
						y: 0,
						filter: 'blur(0px)',
						transition: { duration: 0.3, delay: 0.5 },
					}}
					exit={{
						opacity: 0,
						transition: {
							type: 'spring',
							duration: 0.5,
						},
					}}
				>
					<YandexProvider>
						<Maps width={width} height={height} />
					</YandexProvider>
				</Stack>
			)}
		</AnimatePresence>
	);
};

export default YandexMap;
