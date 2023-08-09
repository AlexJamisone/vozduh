import {
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Stack,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { categoryInputs } from '~/constants/categorys';
import { useProductContext } from '~/context/productContext';
import ImageUploader from '../AdminCreateProduct/ImageUploader';
import ProductImage from '../AdminCreateProduct/ProductImage';

const AdminCategorys = () => {
	const { state, dispatch } = useProductContext();
	const handlChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		switch (name) {
			case 'title':
				dispatch({
					type: 'SET_CATEGORY',
					payload: { ...state.category, title: value },
				});
			case 'path':
				dispatch({
					type: 'SET_CATEGORY',
					payload: { ...state.category, path: value },
				});
		}
	};
	return (
		<Stack gap={5}>
			{categoryInputs(state.category).map(
				({ id, label, name, placeholder, value, helper }) => (
					<FormControl key={id}>
						<FormLabel>{label}</FormLabel>
						<Input
							value={value}
							placeholder={placeholder}
							name={name}
							onChange={handlChange}
						/>
						<FormHelperText>{helper}</FormHelperText>
					</FormControl>
				)
			)}
			<Stack
				_dark={{
					border: '1px dashed',
					borderColor: 'gray.600',
					rounded: 'base',
				}}
			>
				<ImageUploader endpoint="signlUploader" />
			</Stack>
			<Stack alignItems="center" mt={3}>
				{state.category.image.length !== 0 && (
					<ProductImage src={state.category.image} />
				)}
			</Stack>
		</Stack>
	);
};

export default AdminCategorys;
