import { v4 as uuid } from 'uuid';
import type { OffilineInputName } from '~/store/useOfflineShop';

type ShopInputs = {
	id: string;
	placeholder: string;
	name: OffilineInputName;
	label: string;
};

export const shopInputs: ShopInputs[] = [
	{
		id: uuid(),
		label: 'Название магазина',
		name: 'name',
		placeholder: 'Введите название магазина',
	},
	{
		id: uuid(),
		label: 'Адрес',
		name: 'fullAddress',
		placeholder: 'например: Севастополь, улица Героев Сталинграда 27',
	},
	{
		id: uuid(),
		label: 'Телефон',
		name: 'phone',
		placeholder: 'Введите телефон',
	},
	{
		id: uuid(),
		label: 'Режим работы',
		name: 'work_time',
		placeholder: 'Рабочее время',
	},
];
