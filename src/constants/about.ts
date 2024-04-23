import { HTMLInputTypeAttribute } from 'react';
import { v4 as uuid } from 'uuid';
import type { AboutInputName } from '~/store/useAbout';

type AboutInput = {
	id: string;
	name: AboutInputName;
	placeholder: string;
	type: HTMLInputTypeAttribute;
	label: string;
	isTextarea?: boolean;
};
export const about: AboutInput[] = [
	{
		id: uuid(),
		name: 'title',
		placeholder: 'Укажи заголовок секции',
		type: 'text',
		label: 'Заголовок',
	},
	{
		id: uuid(),
		name: 'content',
		placeholder: 'Укажи контект секции',
		type: 'text',
		label: 'Контект',
		isTextarea: true,
	},
];
