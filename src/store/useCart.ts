import { create } from 'zustand';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '~/helpers/getFromLocalStorage';
import { Service } from './useProductDitails';

export type CartItem = {
	id: string;
	img: string;
	name: string;
	size: string;
	price: number;
	quantity: number;
	service: Service[];
};
type CartState = {
	items: CartItem[];
	total: number;
};

type CartAction = {
	add: (item: Omit<CartItem, 'quantity'>) => void;
	remove: (id: string, size: string, service: CartItem['service']) => void;
	update: (
		id: string,
		size: string,
		quantity: number,
		additionalOptions: CartItem['service']
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
				(i, index) =>
					i.id === item.id &&
					i.size === item.size &&
					i.service?.[index]?.optionId ===
						item.service?.[index]?.optionId
			);
			const total =
				state.total +
				item.price +
				(item.service.reduce((acc, curr) => acc + curr.price, 0) ?? 0);
			if (idx === -1) {
				const newItem: CartItem = {
					id: item.id,
					name: item.name,
					price: item.price,
					service: item.service,
					size: item.size,
					img: item.img,
					quantity: 1,
				};
				const newState: CartState = {
					items: [...state.items, newItem],
					total,
				};
				saveToLocalStorage(newState, CART_KEY);
				return newState;
			} else {
				const updItem: CartItem = {
					id: item.id,
					name: item.name,
					price: item.price,
					service: item.service,
					img: item.img,
					size: item.size,
					quantity: (state.items?.[idx]?.quantity ?? 0) + 1,
				};
				const updateItems = [...state.items];
				updateItems[idx] = updItem;
				const newState: CartState = {
					items: updateItems,
					total,
				};
				saveToLocalStorage(newState, CART_KEY);
				return newState;
			}
		}),
	update: (id, size, quantity, service) =>
		set((state) => {
			const update = state.items.map((itm) => {
				if (
					itm.id === id &&
					itm.size === size &&
					areAdditionalOptionsEqual(itm.service, service)
				)
					return {
						...itm,
						quantity,
						service,
					};
				return itm;
			});
			const updateTotal = update.reduce(
				(sum, item) =>
					sum +
					(item.price +
						item.service.reduce(
							(optionSum, option) => optionSum + option.price,
							0
						)) *
						item.quantity,
				0
			);
			const newState: CartState = {
				items: update,
				total: updateTotal,
			};
			saveToLocalStorage(newState, CART_KEY);
			return newState;
		}),
	clear: () =>
		set(() => {
			saveToLocalStorage(init, CART_KEY);
			return init;
		}),
	remove: (id, size, service) =>
		set((state) => {
			let reduction = 0;

			const updatedItems = state.items.filter((item) => {
				// Check if the item matches the ID, size ID, and additional options
				const isMatchingItem =
					item.id === id &&
					item.size === size &&
					areAdditionalOptionsEqual(item.service, service);

				// Calculate the reduction for the matching item
				if (isMatchingItem) {
					reduction =
						item.price * (item.quantity || 0) +
						(item.service || []).reduce(
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
				total: updatedTotalSum,
			};
			saveToLocalStorage(newState, CART_KEY);
			return newState;
		}),
}));
function areAdditionalOptionsEqual(
	options1: CartItem['service'] | undefined,
	options2: CartItem['service'] | undefined
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
