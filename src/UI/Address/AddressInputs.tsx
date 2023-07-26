import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { IMaskInput } from 'react-imask';
import { addressInput } from '~/constants/address';
import { useCreateAddressContext } from '~/context/addressContext';

const AddressInputs = () => {
	const { dispatchAddress, address, isError, error, reset } =
		useCreateAddressContext();
	const handlInput = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'firstName':
				dispatchAddress({ type: 'SET_FIRSTNAME', payload: value });
				break;
			case 'lastName':
				dispatchAddress({ type: 'SET_LASTNAME', payload: value });
				break;
			case 'phone':
				dispatchAddress({ type: 'SET_PHONE', payload: value });
				break;
			default:
				break;
		}
	};
	return (
		<>
			{addressInput(address).map(({ name, placeholder, value }) => (
				<FormControl
					key={name}
					isInvalid={isError && error?.[name] !== undefined}
				>
					<FormLabel>{placeholder}</FormLabel>
					<Input
						as={IMaskInput}
						mask={name === 'phone' ? '+{7}(000)000-00-00' : ''}
						type="text"
						value={value}
						placeholder={placeholder}
						onChange={(e) => {
							handlInput(e);
							reset();
						}}
						name={name}
					/>
					<FormErrorMessage fontWeight={600}>
						{error?.[name]}
					</FormErrorMessage>
				</FormControl>
			))}
		</>
	);
};

export default AddressInputs;
