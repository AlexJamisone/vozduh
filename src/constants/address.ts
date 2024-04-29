import type { HTMLInputTypeAttribute } from 'react';
import type { AddressInputName } from '~/store/useAddress';
import {v4 as uuid} from 'uuid'

type AddressInputType = {
	id: string;
	name: AddressInputName;
	placeholder: string;
	label: string;
	type: HTMLInputTypeAttribute;
	isTextarea?: boolean;
	isMask?: boolean;
};
export const addressInput: AddressInputType[] = [
	{
		placeholder: 'Введите ваше имя',
		name: 'firstName',
		id: uuid(),
		type: 'text',
		label: 'Имя',
	},
	{
		placeholder: 'Введите вашу фамилию',
		name: 'lastName',
		label: 'Фамилия',
		type: 'text',
		id: uuid(),
	},
	{
		placeholder: 'Введите ваш телефон',
		name: 'contactPhone',
		id: uuid(),
		type: 'text',
		label: 'Телефон',
		isMask: true,
	},
	{
		placeholder: 'Ваши пожелания к заказу',
		name: 'comment',
		id: uuid(),
		type: 'text',
		label: 'Комметарий',
		isTextarea: true,
	},
];
