export type CartState = {
	items: CartItems[];
	totalSum: number;
};

type CartItems = {
	id: string;
	sizeId: string;
	price: number;
	quantity: number;
	additionalOptionsId?: string;
};

interface SetAddAction {
	type: 'ADD';
	payload: CartItems;
}

interface SetRemoveAction {
	type: 'REMOVE';
	payload: { id: string; sizeId: string; additionalOptionsId: string };
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
					item.additionalOptionsId ===
						action.payload.additionalOptionsId
			);
			if (itemIndex === -1) {
				const newItems: CartItems = {
					...action.payload,
					quantity: 1,
				};
				return {
					...state,
					items: [...state.items, newItems],
					totalSum: state.totalSum + action.payload.price,
				};
			} else {
				const updatedItems = [...state.items];
				const existingItem = updatedItems[itemIndex];
				if (existingItem) {
					const updatedItem = {
						...existingItem,
						qunatity: existingItem.quantity + 1,
					};
					updatedItems[itemIndex] = updatedItem;
					return {
						...state,
						items: updatedItems,
						totalSum: state.totalSum + action.payload.price,
					};
				}
			}
		}
		case 'UPDATE': {
			const updatedItems = state.items.map((item) => {
				if (
					item.id === action.payload.id &&
					item.sizeId === action.payload.sizeId &&
					item.additionalOptionsId ===
						action.payload.additionalOptionsId
				) {
					return {
						...item,
						quantity: action.payload.quantity,
					};
				}
				return item;
			});
			const updatedTotalSum = updatedItems.reduce(
				(sum, item) => sum + item.price * item.quantity,
				0
			);
			return {
				...state,
				items: updatedItems,
				totalSum: updatedTotalSum,
			};
		}
		case 'REMOVE': {
			const updatedItems = state.items.filter(
				(item) =>
					item.id !== action.payload.id &&
					item.sizeId !== action.payload.sizeId &&
					item.additionalOptionsId !==
						action.payload.additionalOptionsId
			);
			const removeItem = state.items.find(
				(item) =>
					item.id === action.payload.id &&
					item.sizeId === action.payload.sizeId &&
					item.additionalOptionsId ===
						action.payload.additionalOptionsId
			);
			const updatedTotalSum =
				state.totalSum -
				(removeItem?.price || 0) * (removeItem?.quantity || 0);
			return {
				...state,
				items: updatedItems,
				totalSum: updatedTotalSum,
			};
		}
		case 'CLEAR':
			return initial;
		default:
			return state;
	}
}
