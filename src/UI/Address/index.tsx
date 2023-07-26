import { Stack } from '@chakra-ui/react';
import YandexMap from '../Maps/YandexMap';
import AddressInputs from './AddressInputs';
import AddressPointCard from './AddressPointCard';
import AddressSelectCity from './AddressSelectCity';

const CreateAddress = () => {
	return (
		<Stack>
			<AddressInputs />
			<AddressSelectCity />
			<AddressPointCard />
			<YandexMap />
		</Stack>
	);
};

export default CreateAddress;
