import type { ShopState } from '~/reducer/shopReducer';

type ShopInputs = {
	id: number;
	placeholder: string;
	name: string;
	label: string;
	value: string;
};

export function shopInputs(value: ShopState): ShopInputs[] {
	return [
		{
			id: 1,
			label: 'Название магазина',
			name: 'name',
			placeholder: 'Введите название магазина',
			value: value.name,
		},
		{
			id: 2,
			label: 'Адрес',
			name: 'fullAddress',
			placeholder: 'например: Севастополь, улица Героев Сталинграда 27',
			value: value.fullAddress,
		},
		{
			id: 3,
			label: 'Телефон',
			name: 'phone',
			placeholder: 'Введите телефон',
			value: value.phone,
		},
		{
			id: 4,
			label: 'Режим работы',
			name: 'work_time',
			placeholder: 'Рабочее время',
			value: value.work_time ?? '',
		},
	];
}
