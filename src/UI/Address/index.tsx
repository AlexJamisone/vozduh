import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import YandexMap from '../Maps/YandexMap';
import AddressInputs from './AddressInputs';
import AddressPointCard from './AddressPointCard';
import AddressSelectCity from './AddressSelectCity';

const CreateAddress = () => {
	return (
		<Stack direction="row" gap={24} alignItems="center">
			<Stack w={300} as={motion.div} layout>
				<AddressInputs />
				<AddressSelectCity />
			</Stack>
			<Stack gap={8}>
				<AddressPointCard />
				<YandexMap />
			</Stack>
		</Stack>
	);
};

export default CreateAddress;
