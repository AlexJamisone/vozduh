type ControllButton = {
	id: number;
	value: string;
	stateView: boolean;
	stateEdit: boolean;
};

export const productControllButton = ({
	stateView,
	stateEdit,
}: {
	stateView: boolean[];
	stateEdit: boolean[];
}): ControllButton[] => {
	return [
		{
			id: 1,
			value: 'Товар',
			stateView: stateView[0] as boolean,
			stateEdit: stateEdit[0] as boolean,
		},
		{
			id: 2,
			value: 'Размер',
			stateView: stateView[1] as boolean,
			stateEdit: stateEdit[1] as boolean,
		},
		{
			id: 3,
			value: 'Категорию',
			stateView: stateView[2] as boolean,
			stateEdit: stateEdit[2] as boolean,
		},
	];
};
