type ShopInputs = {
	id: number;
	placeholder: string;
	name: string;
	label: string;
};

export const shopInputs: ShopInputs[] = [
	{
		id: 1,
		label: 'Название магазина',
		name: 'name',
		placeholder: 'Введите название магазина',
	},
	{
		id: 2,
		label: 'Адрес',
		name: 'fullAddress',
		placeholder: 'например: Севастополь, улица Героев Сталинграда 27',
	},
	{
		id: 3,
		label: 'Телефон',
		name: 'phone',
		placeholder: 'Введите телефон',
	},
	{
		id: 4,
		label: 'Режим работы',
		name: 'work_time',
		placeholder: 'Рабочее время',
	},
];
