import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAddress } from '~/store/useAddress';
import YandexMap from '../Maps/YandexMap';
import AddressInputs from './AddressInputs';
import AddressPointCard from './AddressPointCard';
import AddressSelectCity from './AddressSelectCity';

const CreateAddress = () => {
	const show = useAddress((state) => state.controller.showMap);
	return (
		<Stack direction="row" justifyContent="center">
			<Stack
				w={300}
				as={motion.div}
				layout
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: {
						type: 'spring',
						duration: 0.3,
					},
				}}
			>
				<AddressInputs />
				<AddressSelectCity />
			</Stack>
			<Stack gap={8} as={motion.div} layout>
				<AddressPointCard />
				{show && <YandexMap width={400} height={200} />}
			</Stack>
		</Stack>
	);
};

export default CreateAddress;
