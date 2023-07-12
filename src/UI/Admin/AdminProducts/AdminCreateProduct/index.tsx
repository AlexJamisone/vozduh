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
import AdditionalService from './AdditionalService';
import CardWithImage from './CardWithImage';
import CreateProductAction from './CreateProductAction';
import ImageUploader from './ImageUploader';
import SelectCategory from './SelectCategory';
import SelectSize from './SelectSize';

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
		<Stack
			gap={3}
			maxW={650}
			maxH={630}
			overflowY="auto"
			px={10}
			sx={{
				'::-webkit-scrollbar': {
					width: '5px',
					height: '5px',
				},
				'::-webkit-scrollbar-track': {
					bgColor: '#eee',
					boxShadow:
						'0 0 1px 1px #bbb, inset 0 0 7px rgba(0,0,0,0.3)',
					borderRadius: '2xl',
				},
				'::-webkit-scrollbar-thumb': {
					bgColor: 'linear-gradient(left, #96A6BF, #63738C)',
					rounded: '2xl',
					boxShadow: 'inset 0 0 1px 1px #5C6670',
				},
			}}
		>
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
								h={textarea ? '200px' : undefined}
							/>
						</FormControl>
					)
				)}
			</Stack>
			<ImageUploader />
			<CardWithImage />
			<SelectCategory />
			<SelectSize />
			<AdditionalService />
			<CreateProductAction />
		</Stack>
	);
};

export default AdminCreateProduct;
