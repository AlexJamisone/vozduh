import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { productCreate } from '~/constants/productCreate';
import { useProductContext } from '~/context/productContext';

const CreateProductInputs = () => {
	const { dispatch, state, errorProduct, isErrorProduct, resetProduct } =
		useProductContext();
	const handlChange = (e: ChangeEvent<HTMLInputElement>) => {
		resetProduct();
		const { value, name } = e.target;
		switch (name) {
			case 'name':
				dispatch({
					type: 'SET_PRODUCT',
					payload: { ...state.product, name: value },
				});
				break;
			case 'description':
				dispatch({
					type: 'SET_PRODUCT',
					payload: { ...state.product, description: value },
				});
				break;
			case 'price':
				dispatch({
					type: 'SET_PRODUCT',
					payload: {
						...state.product,
						price: value,
					},
				});
				break;
			default:
				break;
		}
	};
	return (
		<Stack>
			{productCreate(state.product).map(
				({ label, name, placeholder, value, textarea }) => (
					<FormControl
						key={name}
						isInvalid={
							isErrorProduct &&
							errorProduct?.fieldErrors[name] !== undefined
						}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							name={name}
							type="text"
							as={textarea ? Textarea : undefined}
							value={value}
							placeholder={placeholder}
							onChange={handlChange}
						/>
						<FormErrorMessage>
							{errorProduct?.fieldErrors[name]}
						</FormErrorMessage>
					</FormControl>
				)
			)}
		</Stack>
	);
};

export default CreateProductInputs;
