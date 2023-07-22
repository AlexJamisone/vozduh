export type CartState = {
	items: CartItems[];
	totalSum: number;
};

type CartItems = {
	id: string;
	sizeId: string;
	name: string;
	image: string;
	price: number;
	quantity: number;
	additionalOptions?: {
		optionId: string;
		price: number;
	}[];
};

interface SetAddAction {
	type: 'ADD';
	payload: CartItems;
}

interface SetRemoveAction {
	type: 'REMOVE';
	payload: {
		id: string;
		sizeId: string;
		additionalOptions?: {
			optionId: string;
			price: number;
		}[];
	};
}

interface SetUpdateAction {
	type: 'UPDATE';
	payload: CartItems;
}

interface SetClearAction {
	type: 'CLEAR';
}

export type Action =
	| SetAddAction
	| SetRemoveAction
	| SetUpdateAction
	| SetClearAction;

export const initial: CartState = {
	items: [],
	totalSum: 0,
};

export function cartReducer(state: CartState, action: Action): CartState {
	switch (action.type) {
		case 'ADD': {
			const itemIndex = state.items.findIndex(
				(item) =>
					item.id === action.payload.id &&
					item.sizeId === action.payload.sizeId &&
					item.additionalOptions?.length ===
						action.payload.additionalOptions?.length &&
					item.additionalOptions?.every(
						(option, index) =>
							option.optionId ===
							action.payload.additionalOptions?.[index]?.optionId
					)
			);
			if (itemIndex === -1) {
				const newItems: CartItems = {
					...action.payload,
					quantity: 1,
				};
				return {
					...state,
					items: [...state.items, newItems],
					totalSum:
						state.totalSum +
						action.payload.price +
						(action.payload.additionalOptions?.reduce(
							(sum, option) => sum + Number(option.price),
							0
						) || 0),
				};
			} else {
				const updatedItems = [...state.items];
				const existingItem = updatedItems[itemIndex];
				if (existingItem) {
					const updatedItem = {
						...existingItem,
						quantity: existingItem.quantity + 1,
					};
					updatedItems[itemIndex] = updatedItem;
					return {
						...state,
						items: updatedItems,
						totalSum:
							state.totalSum +
							action.payload.price +
							(action.payload.additionalOptions?.reduce(
								(sum, option) => sum + Number(option.price),
								0
							) || 0),
					};
				}
			}
		}
		case 'UPDATE': {
			const updatedItems = state.items.map((item) => {
				if (
					item.id === action.payload.id &&
					item.sizeId === action.payload.sizeId &&
					item.additionalOptions === action.payload.additionalOptions
				) {
					return {
						...item,
						quantity: action.payload.quantity,
					};
				}
				return item;
			});
			const updatedTotalSum = updatedItems.reduce(
				(sum, item) => sum + item.price * (item.quantity || 0),
				0
			);
			return {
				...state,
				items: updatedItems,
				totalSum: updatedTotalSum,
			};
		}
		case 'REMOVE': {
			const { id, sizeId, additionalOptions } = action.payload;

			const updatedItems = state.items.filter((item) => {
				if (
					item.id === id &&
					item.sizeId === sizeId &&
					areAdditionalOptionsEqual(
						item.additionalOptions,
						additionalOptions
					)
				) {
					// Calculate the reduction in the totalSum for the removed item
					const reduction =
						item.price *
						(item.quantity || 0) *
						(item.additionalOptions?.length || 1);

					// Subtract the reduction from the totalSum
					return (state.totalSum -= reduction);
				}
				return true;
			});

			return {
				...state,
				items: updatedItems,
			};
		}
		case 'CLEAR':
			return initial;
		default:
			return state;
	}
}

function areAdditionalOptionsEqual(
	options1: CartItems['additionalOptions'] | undefined,
	options2: CartItems['additionalOptions'] | undefined
): boolean {
	if (!options1 && !options2) {
		return true;
	}

	if (!options1 || !options2 || options1.length !== options2.length) {
		return false;
	}

	for (let i = 0; i < options1.length; i++) {
		const option1 = options1[i];
		const option2 = options2[i];

		if (!option1 || !option2) {
			return false;
		}

		if (
			option1.optionId !== option2.optionId ||
			option1.price !== option2.price
		) {
			return false;
		}
	}

	return true;
}
