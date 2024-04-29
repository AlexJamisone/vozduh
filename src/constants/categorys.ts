import type { HTMLInputTypeAttribute } from 'react';
import type { CategoryInputName } from '~/store/useCreateCategory';
import {v4 as uuid} from 'uuid'

type CategoryInput = {
	id: string;
	placeholder: string;
	name: CategoryInputName;
	label: string;
	type: HTMLInputTypeAttribute;
	helper?: string;
};

export const categoryInputs: CategoryInput[] = [
	{
		id: uuid(),
		label: 'Название',
		name: 'title',
		placeholder: 'Название категории',
		type: 'text',
	},
	{
		id: uuid(),
		label: 'Путь',
		name: 'path',
		placeholder: 'Название пути',
		helper: '* Указывать только на английском',
		type: 'text',
	},
];
