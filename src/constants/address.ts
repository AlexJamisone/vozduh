import type { AddressState } from '~/reducer/addressReducer';

type AddressInputType = {
	name: string;
	placeholder: string;
	value: string;
	errorMessage: string;
};
export const addressInput = (input: AddressState): AddressInputType[] => {
	return [
		{
			placeholder: 'Имя',
			name: 'firstName',
			value: input.firstName,
			errorMessage: 'Пожалуйста, укажите своё имя.',
		},
		{
			placeholder: 'Фамилия',
			name: 'lastName',
			value: input.lastName,
			errorMessage: 'Не забудьте указать фамилию.',
		},
		{
			placeholder: 'Телефон',
			name: 'phone',
			value: input.contactPhone,
			errorMessage:
				'Проверьте телефон, в нём есть ошибка' ||
				'Укажите ваш номер телефона, чтобы мы могли с вами связаться.',
		},
	];
};
