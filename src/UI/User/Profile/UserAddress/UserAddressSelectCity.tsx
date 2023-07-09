import { FormControl, FormLabel, Input, InputGroup } from '@chakra-ui/react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useCreateAddressContext } from '~/context/addressContext';
import { env } from '~/env.mjs';

const UserAddressSelectCity = () => {
	const { valueSuggestion, handlPoints } = useCreateAddressContext();
	return (
		<InputGroup>
			<FormControl>
				<FormLabel>Город</FormLabel>
				<AddressSuggestions
					onChange={(sug) => handlPoints(sug)}
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
					value={valueSuggestion}
				/>
			</FormControl>
		</InputGroup>
	);
};

export default UserAddressSelectCity;
