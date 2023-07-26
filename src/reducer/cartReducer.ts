export type CartState = {
	items: CartItem[];
	totalSum: number;
};

export type CartItem = {
	id: string;
	size: {
		id: string;
		value: string;
	};
	name: string;
	image: string;
	price: number;
	quantity: number;
	additionalOptions?: {
		optionTitle: string;
		serviceTitle: string;
		optionId: string;
		price: number;
	}[];
};

interface SetAddAction {
	type: 'ADD';
	payload: CartItem;
}

interface SetRemoveAction {
	type: 'REMOVE';
	payload: {
		id: string;
		sizeId: string;
		additionalOptions?: {
			optionTitle: string;
			serviceTitle: string;
			optionId: string;
			price: number;
		}[];
	};
}

interface SetUpdateAction {
	type: 'UPDATE';
	payload: CartItem;
}

interface SetClearAction {
	type: 'CLEAR';
}

export type Action =
	| SetAddAction
	| SetRemoveAction
	| SetUpdateAction
	| SetClearAction;

const CART_STORAGE_KEY = 'cart';

const getCartFromLocalStorage = (): CartState | null => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const cartJSON = window.localStorage.getItem(CART_STORAGE_KEY);
		if (cartJSON) {
			return JSON.parse(cartJSON) as CartState;
		}
	}
	return null;
};

const saveCartToLocalStorage = (cart: CartState) => {
	if (typeof window !== 'undefined' && window.localStorage) {
		window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
	}
};

export const initial: CartState = getCartFromLocalStorage() || {
	items: [],
	totalSum: 0,
};

export function cartReducer(
	state: CartState = initial,
	action: Action
): CartState {
	switch (action.type) {
		case 'ADD': {
			const itemIndex = state.items.findIndex(
				(item) =>
					item.id === action.payload.id &&
					item.size.id === action.payload.size.id &&
					item.additionalOptions?.length ===
						action.payload.additionalOptions?.length &&
					item.additionalOptions?.every(
						(option, index) =>
							option.optionId ===
							action.payload.additionalOptions?.[index]?.optionId
					)
			);
			if (itemIndex === -1) {
				const newItems: CartItem = {
					...action.payload,
					quantity: 1,
				};
				const newState = {
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
				saveCartToLocalStorage(newState);
				return newState;
			} else {
				const updatedItems = [...state.items];
				const existingItem = updatedItems[itemIndex];
				if (existingItem) {
					const updatedItem = {
						...existingItem,
						quantity: existingItem.quantity + 1,
					};
					updatedItems[itemIndex] = updatedItem;
					const newState = {
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
					saveCartToLocalStorage(newState);
					return newState;
				}
			}
		}
		case 'UPDATE': {
			const { id, size, additionalOptions, quantity } = action.payload;

			const updatedItems = state.items.map((item) => {
				// Check if the item matches the ID, size ID, and additional options
				if (
					item.id === id &&
					item.size.id === size.id &&
					areAdditionalOptionsEqual(
						item.additionalOptions,
						additionalOptions
					)
				) {
					// Update the quantity and additional options of the item
					return {
						...item,
						quantity: quantity,
						additionalOptions: additionalOptions || [],
					};
				}
				return item;
			});

			// Calculate the total sum for the updated items
			const updatedTotalSum = updatedItems.reduce(
				(sum, item) =>
					sum +
					item.price * (item.quantity || 0) +
					(item.additionalOptions || []).reduce(
						(optionSum, option) => optionSum + option.price,
						0
					),
				0
			);
			const newState = {
				...state,
				items: updatedItems,
				totalSum: updatedTotalSum,
			};
			saveCartToLocalStorage(newState);
			return newState;
		}

		case 'REMOVE': {
			const { id, sizeId, additionalOptions } = action.payload;

			// Initialize the reduction to zero
			let reduction = 0;

			const updatedItems = state.items.filter((item) => {
				// Check if the item matches the ID, size ID, and additional options
				const isMatchingItem =
					item.id === id &&
					item.size.id === sizeId &&
					areAdditionalOptionsEqual(
						item.additionalOptions,
						additionalOptions
					);

				// Calculate the reduction for the matching item
				if (isMatchingItem) {
					reduction =
						item.price * (item.quantity || 0) +
						(item.additionalOptions || []).reduce(
							(optionSum, option) => optionSum + option.price,
							0
						);
				}

				// Return true to keep items that don't match the criteria
				return !isMatchingItem;
			});

			// Calculate the updated totalSum
			const updatedTotalSum = state.totalSum - reduction;
			const newState = {
				...state,
				items: updatedItems,
				totalSum: updatedTotalSum,
			};
			saveCartToLocalStorage(newState);
			return newState;
		}
		case 'CLEAR': {
			// saveCartToLocalStorage(initial);
			return initial;
		}
		default:
			return state;
	}
}

function areAdditionalOptionsEqual(
	options1: CartItem['additionalOptions'] | undefined,
	options2: CartItem['additionalOptions'] | undefined
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
