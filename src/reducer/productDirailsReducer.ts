export type ProductDitailsState = {
	size: {
		id: string;
		value: string;
		isSelected: boolean;
		errorSelect: boolean;
	};
	additionalServ: AdditionalServiceDitails[];
};

type AdditionalServiceDitails = {
	serviceTitle: string;
	optionTitle: string;
	serviceId: string;
	optionId: string;
	price: number;
};

interface SetSizeAction {
	type: 'SIZE';
	payload: {
		id: string;
		value: string;
	};
}

interface SetServiceAction {
	type: 'SERVICE';
	payload: AdditionalServiceDitails;
}

interface SetSizeErrorSelectAction {
	type: 'SIZE_ERROR';
	payload: boolean;
}

interface SetClearAction {
	type: 'CLEAR';
}

export type Action =
	| SetClearAction
	| SetServiceAction
	| SetSizeAction
	| SetSizeErrorSelectAction;

export const initial: ProductDitailsState = {
	additionalServ: [],
	size: {
		id: '',
		value: '',
		isSelected: false,
		errorSelect: false,
	},
};

export const productDitailsReducer = (
	state: ProductDitailsState,
	action: Action
): ProductDitailsState => {
	switch (action.type) {
		case 'CLEAR':
			return initial;
		case 'SIZE':
			if (action.payload.id === '') {
				return {
					...state,
					size: {
						id: '',
						value: '',
						isSelected: false,
						errorSelect: false,
					},
				};
			} else {
				return {
					...state,
					size: {
						id: action.payload.id,
						value: action.payload.value,
						isSelected: true,
						errorSelect: false,
					},
				};
			}
		case 'SIZE_ERROR': {
			return {
				...state,
				size: {
					...state.size,
					errorSelect: action.payload,
				},
			};
		}
		case 'SERVICE': {
			const exitsitng = state.additionalServ.find(
				(serv) => serv.serviceId === action.payload.serviceId
			);
			if (exitsitng) {
				if (action.payload.optionId === '') {
					return {
						...state,
						additionalServ: state.additionalServ.filter(
							(serv) =>
								serv.serviceId !== action.payload.serviceId
						),
					};
				} else {
					return {
						...state,
						additionalServ: state.additionalServ.map((serv) =>
							serv.serviceId === action.payload.serviceId
								? {
										...serv,
										optionId: action.payload.optionId,
										price: action.payload.price,
								  }
								: serv
						),
					};
				}
			} else {
				return {
					...state,
					additionalServ: [
						...state.additionalServ,
						{
							optionId: action.payload.optionId,
							serviceId: action.payload.serviceId,
							price: action.payload.price,
							optionTitle: action.payload.optionTitle,
							serviceTitle: action.payload.serviceTitle,
						},
					],
				};
			}
		}
		default:
			return state;
	}
};
