import type { Product } from '~/reducer/productReducer';

type ProdctCreate = {
	name: string;
	placeholder: string;
	value: string;
	label: string;
	textarea?: boolean;
};

export function productCreate(product: Product): ProdctCreate[] {
	return [
		{
			name: 'name',
			label: 'Название',
			placeholder: 'Введите название товара',
			value: product.name,
		},
		{
			name: 'description',
			label: 'Описание',
			placeholder: 'Введите описание',
			value: product.description,
			textarea: true,
		},
		{
			name: 'price',
			label: 'Цена',
			placeholder: 'Введите цену в ₽',
			value: product.price,
		},
	];
}
