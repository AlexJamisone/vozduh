import type { ProductState } from '~/reducer/productReducer';

type SizeConst = {
	id: number;
	label: string;
	placeholder: string;
	name: string;
	value: ProductState['size']['value'];
};

export function size(value: ProductState['size']['value']): SizeConst[] {
	return [
		{
			id: 1,
			name: 'title',
			label: 'Размер',
			placeholder: 'Введите значение',
			value,
		},
	];
}
