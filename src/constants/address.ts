import type { AddressState } from '~/reducer/addressReducer';

type AddressInputType = {
	name: string;
	placeholder: string;
	value: string;
};
export const addressInput = (input: AddressState): AddressInputType[] => {
	return [
		{
			placeholder: 'Имя',
			name: 'firstName',
			value: input.firstName,
		},
		{
			placeholder: 'Фамилия',
			name: 'lastName',
			value: input.lastName,
		},
		{
			placeholder: 'Телефон',
			name: 'phone',
			value: input.contactPhone,
		},
	];
};
