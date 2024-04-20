import { HTMLInputTypeAttribute } from 'react';
import type { AboutInputName } from '~/store/useAbout';

type AboutInput = {
	id: number;
	name: AboutInputName;
	placeholder: string;
	type: HTMLInputTypeAttribute;
	label: string;
	isTextarea?: boolean;
};
export const about: AboutInput[] = [
	{
		id: 1,
		name: 'title',
		placeholder: 'Укажи заголовок секции',
		type: 'text',
		label: 'Заголовок',
	},
	{
		id: 2,
		name: 'content',
		placeholder: 'Укажи контект секции',
		type: 'text',
		label: 'Контект',
		isTextarea: true,
	},
];
