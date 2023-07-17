export type ProductDitailsState = {
	sizeId: string;
	additionalServ: AdditionalServiceDitails[];
};

type AdditionalServiceDitails = {
	serviceId: string;
	optionId: string;
	price: number;
};

interface SetSizeAction {
	type: 'SIZE';
	payload: string;
}

interface SetService {
	type: 'SERVICE';
	payload: AdditionalServiceDitails;
}

interface SetClear {
	type: 'CLEAR';
}
export type Action = SetClear | SetService | SetSizeAction;

export const initial: ProductDitailsState = {
	additionalServ: [],
	sizeId: '',
};

export const productDitailsReducer = (
	state: ProductDitailsState,
	action: Action
): ProductDitailsState => {
	switch (action.type) {
		case 'CLEAR':
			return initial;
		case 'SIZE':
			return { ...state, sizeId: action.payload };
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
						},
					],
				};
			}
		}
	}
};
