import type { ProductState } from '~/reducer/productReducer';

type CategoryInput = {
	id: number;
	placeholder: string;
	name: string;
	label: string;
	value: string;
	helper?: string;
};

export const categoryInputs = (
	category: ProductState['category']
): CategoryInput[] => {
	return [
		{
			id: 1,
			label: 'Название',
			name: 'title',
			placeholder: 'Название категории',
			value: category.title,
		},
		{
			id: 2,
			label: 'Путь',
			name: 'path',
			placeholder: 'Название пути',
			value: category.path,
			helper: '* Указывать только на английском',
		},
	];
};
