import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useCreateAddressContext } from '~/context/addressContext';
import YandexMap from '../Maps/YandexMap';
import AddressInputs from './AddressInputs';
import AddressPointCard from './AddressPointCard';
import AddressSelectCity from './AddressSelectCity';

const CreateAddress = () => {
	const { address } = useCreateAddressContext();
	return (
		<Stack
			direction="row"
			justifyContent="center"
			gap={address.map || address.point.isPointSelect ? 10 : undefined}
		>
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
				<YandexMap width={400} height={200} />
			</Stack>
		</Stack>
	);
};

export default CreateAddress;
