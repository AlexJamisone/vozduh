import {
	FormControl,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { productCreate } from '~/constants/productCreate';
import { useProductContext } from '~/context/productContext';
import ImageUploader from './ImageUploader';

const AdminCreateProduct = () => {
	const { state, dispatch } = useProductContext();
	const handlChange = (e: ChangeEvent<HTMLInputElement>) => {
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
			<Stack>
				{productCreate(state.product).map(
					({ label, name, placeholder, value, textarea }) => (
						<FormControl key={name}>
							<FormLabel>{label}</FormLabel>
							<Input
								name={name}
								type="text"
								as={textarea ? Textarea : undefined}
								value={value}
								placeholder={placeholder}
								onChange={handlChange}
							/>
						</FormControl>
					)
				)}
			</Stack>
			<ImageUploader />
		</Stack>
	);
};

export default AdminCreateProduct;
