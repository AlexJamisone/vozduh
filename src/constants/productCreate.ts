import type { HTMLInputTypeAttribute } from 'react';
import { v4 as uuid } from 'uuid';
import type { ProductInputName } from '~/store/useCreateProduct';

type ProdctCreate = {
	id: string;
	placeholder: string;
	name: ProductInputName;
	label: string;
	type: HTMLInputTypeAttribute;
	isTextarea?: boolean;
};

export const productCreate: ProdctCreate[] = [
	{
		id: uuid(),
		name: 'name',
		label: 'Название',
		placeholder: 'Введите название товара',
		type: 'text',
	},
	{
		id: uuid(),
		name: 'description',
		label: 'Описание',
		placeholder: 'Введите описание',
		isTextarea: true,
		type: 'text',
	},
	{
		id: uuid(),
		name: 'price',
		label: 'Цена',
		placeholder: 'Введите цену в ₽',
		type: 'number',
	},
];
