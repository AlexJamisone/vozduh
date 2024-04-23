import { FormControl, FormErrorMessage, Select } from '@chakra-ui/react';
import { useCreateProduct } from '~/store/useCreateProduct';
import { api } from '~/utils/api';

const SelectCategory = () => {
	const { data: categorys } = api.categorys.get.useQuery();
	const [category, set, error, reset] = useCreateProduct((state) => [
		state.category,
		state.setCategory,
		state.error,
		state.reset,
	]);
	if (!categorys) return null;
	return (
		<FormControl
			isInvalid={
				error?.isError && error.path.fieldErrors.category !== undefined
			}
		>
			<Select
				placeholder="Выбери категорию"
				onChange={(e) => {
					if (error?.isError) {
						reset();
					}
					set(e.target.value);
				}}
				value={category}
			>
				{categorys?.map(({ id, title }) => (
					<option key={id} value={title}>
						{title}
					</option>
				))}
			</Select>
			{error?.path.fieldErrors?.category?.map((err) => (
				<FormErrorMessage key={err}>{err}</FormErrorMessage>
			))}
		</FormControl>
	);
};

export default SelectCategory;
