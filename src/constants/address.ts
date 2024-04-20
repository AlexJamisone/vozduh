import { HTMLInputTypeAttribute } from 'react';
import { AddressInputName } from '~/store/useAddress';

type AddressInputType = {
	id: number;
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
		id: 1,
		type: 'text',
		label: 'Имя',
	},
	{
		placeholder: 'Введите вашу фамилию',
		name: 'lastName',
		label: 'Фамилия',
		type: 'text',
		id: 2,
	},
	{
		placeholder: 'Введите ваш телефон',
		name: 'contactPhone',
		id: 3,
		type: 'text',
		label: 'Телефон',
		isMask: true,
	},
	{
		placeholder: 'Ваши пожелания к заказу',
		name: 'comment',
		id: 4,
		type: 'text',
		label: 'Комметарий',
		isTextarea: true,
	},
];
