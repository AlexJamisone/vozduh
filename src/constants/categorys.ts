import { HTMLInputTypeAttribute } from 'react';
import type { CategoryInputName } from '~/store/useCreateCategory';

type CategoryInput = {
	id: number;
	placeholder: string;
	name: CategoryInputName;
	label: string;
	type: HTMLInputTypeAttribute;
	helper?: string;
};

export const categoryInputs: CategoryInput[] = [
	{
		id: 1,
		label: 'Название',
		name: 'title',
		placeholder: 'Название категории',
		type: 'text',
	},
	{
		id: 2,
		label: 'Путь',
		name: 'path',
		placeholder: 'Название пути',
		helper: '* Указывать только на английском',
		type: 'text',
	},
];
