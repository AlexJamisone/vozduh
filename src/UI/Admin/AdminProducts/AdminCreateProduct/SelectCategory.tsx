import { FormControl, FormErrorMessage, Select } from '@chakra-ui/react';
import { useProductContext } from '~/context/productContext';
import { api } from '~/utils/api';

const SelectCategory = () => {
	const { dispatch, state, isErrorProduct, productError, resetProduct } =
		useProductContext();
	const { data: categorys } = api.categorys.get.useQuery();
	if (!categorys) return null;
	return (
		<FormControl
			isInvalid={
				isErrorProduct &&
				productError?.fieldErrors.category !== undefined
			}
		>
			<Select
				placeholder="Выбери категорию"
				onChange={(e) => {
					resetProduct();
					dispatch({
						type: 'SET_PRODUCT',
						payload: {
							...state.product,
							category: e.target.value,
						},
					});
				}}
				value={state.product.category}
			>
				{categorys?.map(({ id, title }) => (
					<option key={id} value={title}>
						{title}
					</option>
				))}
			</Select>
			<FormErrorMessage>
				{productError?.fieldErrors.category}
			</FormErrorMessage>
		</FormControl>
	);
};

export default SelectCategory;
