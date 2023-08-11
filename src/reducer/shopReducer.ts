export type ShopState = {
	id: string;
	name: string;
	fullAddress: string;
	phone: string;
	image: string;
	work_time?: string;
};

interface SetShopInputsAction {
	type: 'SET_SHOP';
	payload: ShopState;
}

interface SetClearShopAction {
	type: 'CLEAR';
}

export type Action = SetShopInputsAction | SetClearShopAction;

export const initial: ShopState = {
	fullAddress: '',
	id: '',
	image: '',
	name: '',
	phone: '',
	work_time: '',
};

export const shopReducer = (state: ShopState, action: Action): ShopState => {
	switch (action.type) {
		case 'SET_SHOP':
			return {
				...state,
				fullAddress: action.payload.fullAddress,
				id: action.payload.id,
				name: action.payload.name,
				image: action.payload.image,
				phone: action.payload.phone,
				work_time: action.payload.work_time,
			};
		case 'CLEAR':
			return initial;
		default:
			return state;
	}
};
