import {
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
} from '@chakra-ui/react';
import {
	AddressSuggestions,
	type DaDataAddress,
	type DaDataSuggestion,
} from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { env } from '~/env.mjs';
import { useAddress } from '~/store/useAddress';
import { api } from '~/utils/api';

const AddressSelectCity = () => {
	const [controller, setPoint, point, setCtrl] = useAddress((state) => [
		state.controller,
		state.setPoint,
		state.point,
		state.setController,
	]);
	const { mutate: getPoints, isLoading } = api.cdek.getPoints.useMutation({
		onSuccess: (points) => {
			setCtrl({ showMap: true });
			setPoint({ points });
		},
	});
	const handlChange = (sug?: DaDataSuggestion<DaDataAddress>) => {
		setPoint({ valueSuggestion: sug, selected: undefined });
		getPoints({ city: sug?.data.postal_code ?? '' });
	};
	return (
		<InputGroup position="relative" zIndex={99}>
			<FormControl isDisabled={controller.isSelected}>
				<FormLabel>Город</FormLabel>
				<AddressSuggestions
					onChange={handlChange}
					autoload
					selectOnBlur
					token={env.NEXT_PUBLIC_DADATA_API_KEY}
					customInput={Input}
					inputProps={{
						placeholder: 'Введите ваш город',
					}}
					filterFromBound="city"
					filterToBound="city"
					renderOption={(sug) => sug.data.city}
					value={point?.valueSuggestion}
				/>
				<InputRightElement position="absolute" top="45%" right={3}>
					{isLoading && <Spinner size="sm" />}
				</InputRightElement>
			</FormControl>
		</InputGroup>
	);
};

export default AddressSelectCity;
