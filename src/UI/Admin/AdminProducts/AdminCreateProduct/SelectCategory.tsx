import { Select } from '@chakra-ui/react';
import { useProductContext } from '~/context/productContext';
import { api } from '~/utils/api';

const SelectCategory = () => {
	const { dispatch, state } = useProductContext();
	const { data: categorys } = api.categorys.get.useQuery();
	if (!categorys) return null;
	console.log(state.product);
	return (
		<Select
			placeholder="Выбери категорию"
			onChange={(e) =>
				dispatch({
					type: 'SET_PRODUCT',
					payload: {
						...state.product,
						category: e.target.value,
					},
				})
			}
		>
			{categorys?.map(({ id, title }) => (
				<option key={id} value={title}>
					{title}
				</option>
			))}
		</Select>
	);
};

export default SelectCategory;
