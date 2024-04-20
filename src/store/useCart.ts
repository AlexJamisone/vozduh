import { create } from 'zustand';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '~/helpers/getFromLocalStorage';

type CartItem = {
	id: string;
	img: string;
	name: string;
	size: string;
	price: number;
	quantity: number;

	additionalOptions?: {
		optionTitle: string;
		serviceTitle: string;
		optionId: string;
		price: number;
	}[];
};
type CartState = {
	items: CartItem[];
	total: number;
};

type CartAction = {
	add: (item: CartItem) => void;
	remove: (
		id: string,
		size: string,
		additionalOptions: CartItem['additionalOptions']
	) => void;
	update: (
		id: string,
		size: string,
		quantity: number,
		additionalOptions: CartItem['additionalOptions']
	) => void;
	clear: () => void;
};
type Cart = CartState & CartAction;

const CART_KEY = 'cart';

const init: CartState = {
	items: [],
	total: 0,
};

const initial: CartState = getFromLocalStorage(CART_KEY) ?? { ...init };

export const useCart = create<Cart>((set) => ({
	...initial,
	add: (item) =>
		set((state) => {
			const idx = state.items.findIndex(
				(i) =>
					i.id === item.id &&
					i.size === item.size &&
					i.additionalOptions?.length ===
						item.additionalOptions?.length &&
					item.additionalOptions?.every(
						(option, index) =>
							option.optionId ===
							item.additionalOptions?.[index]?.optionId
					)
			);
			const total =
				state.total +
				item.price +
				(item.additionalOptions?.reduce(
					(sum, option) => sum + option.price,

					0
				) || 0);
			if (idx === -1) {
				const newItem: CartItem = {
					...item,
					quantity: 1,
				};
				const newState: CartState = {
					items: [...state.items, newItem],
					total,
				};
				saveToLocalStorage(newState, CART_KEY);
				return newState;
			} else {
				const updateItems = [...state.items];
				const existing = updateItems[idx];
				if (existing) {
					const updateItem: CartItem = {
						...existing,
						quantity: existing.quantity + 1,
					};
					updateItems[idx] = updateItem;
					const newState: CartState = {
						...state,
						items: updateItems,
						total,
					};
					saveToLocalStorage(newState, CART_KEY);
					return newState;
				} else {
					return {
						items: [...state.items],
						total,
					};
				}
			}
		}),
	update: (id, size, quantity, additionalOptions) =>
		set((state) => {
			const updatedItems = state.items.map((item) => {
				// Check if the item matches the ID, size ID, and additional options
				if (
					item.id === id &&
					item.size === size &&
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
			saveToLocalStorage(newState, CART_KEY);
			return newState;
		}),
	remove: (id, size, additionalOptions) =>
		set((state) => {
			// Initialize the reduction to zero
			let reduction = 0;

			const updatedItems = state.items.filter((item) => {
				// Check if the item matches the ID, size ID, and additional options
				const isMatchingItem =
					item.id === id &&
					item.size === size &&
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
			const updatedTotalSum = state.total - reduction;
			const newState = {
				...state,
				items: updatedItems,
				totalSum: updatedTotalSum,
			};
			saveToLocalStorage(newState, CART_KEY);
			return newState;
		}),
	clear: () => set(init),
}));

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
