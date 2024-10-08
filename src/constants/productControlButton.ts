import{v4 as uuid} from 'uuid'
type ControllButton = {
	id: string;
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
			id: uuid(),
			value: 'Товар',
			stateView: stateView[0] as boolean,
			stateEdit: stateEdit[0] as boolean,
		},
		{
			id: uuid(),
			value: 'Размер',
			stateView: stateView[1] as boolean,
			stateEdit: stateEdit[1] as boolean,
		},
		{
			id: uuid(),
			value: 'Категорию',
			stateView: stateView[2] as boolean,
			stateEdit: stateEdit[2] as boolean,
		},
	];
};
