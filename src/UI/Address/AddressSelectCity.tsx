import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
} from '@chakra-ui/react';
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';
import { useCreateAddressContext } from '~/context/addressContext';
import { env } from '~/env.mjs';

const AddressSelectCity = () => {
	const {
		valueSuggestion,
		handlPoints,
		dispatchAddress,
		isLoadingCdek,
		address,
	} = useCreateAddressContext();
	return (
		<InputGroup position="relative" zIndex={99}>
			<FormControl
				isDisabled={address.confirmPoint}
				isInvalid={
					valueSuggestion === undefined && address.errorConfirm
				}
			>
				<FormLabel>Город</FormLabel>
				<AddressSuggestions
					onChange={(sug) => {
						dispatchAddress({
							type: 'SET_CONFIRM_ERROR',
							payload: false,
						});
						handlPoints(sug);
					}}
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
				<InputRightElement position="absolute" top="45%" right={3}>
					{isLoadingCdek && <Spinner size="sm" />}
				</InputRightElement>
				<FormErrorMessage>Введите ваш город</FormErrorMessage>
			</FormControl>
		</InputGroup>
	);
};

export default AddressSelectCity;
