import { HTMLInputTypeAttribute } from 'react';
import { ProductInputName } from '~/store/useCreateProduct';

type ProdctCreate = {
	id: number;
	placeholder: string;
	name: ProductInputName;
	label: string;
	type: HTMLInputTypeAttribute;
	isTextarea?: boolean;
};

export const productCreate: ProdctCreate[] = [
	{
		id: 1,
		name: 'name',
		label: 'Название',
		placeholder: 'Введите название товара',
		type: 'text',
	},
	{
		id: 2,
		name: 'description',
		label: 'Описание',
		placeholder: 'Введите описание',
		isTextarea: true,
		type: 'text',
	},
	{
		id: 3,
		name: 'price',
		label: 'Цена',
		placeholder: 'Введите цену в ₽',
		type: 'number',
	},
];
