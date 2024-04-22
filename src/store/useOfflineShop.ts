import type { typeToFlattenedError } from 'zod';
import { create } from 'zustand';
import { getFromLocalStorage } from '~/helpers/getFromLocalStorage';

type OfflineShopState = {
	input: {
		name: string;
		fullAddress: string;
		phone: string;
		work_time?: string;
	};
	image: string;
	edit: {
		is: boolean;
		id: string;
	};
	error?: {
		isError: boolean;
		path: typeToFlattenedError<any, string>;
	};
};
export type OffilineInputName = keyof OfflineShopState['input'];
export type OffilineInputValue = OfflineShopState['input'];

type OfflineShopAction = {
	setInputs: (input: OffilineInputValue) => void;
	setEdit: (edit: OfflineShopState['edit']) => void;
	setError: (error: OfflineShopState['error']) => void;
	setImg: (image: string) => void;
	reset: () => void;
	clear: () => void;
};

type OfflineShop = OfflineShopState & OfflineShopAction;

const SHOP_KEY = 'offline';

const init: OfflineShopState = {
	edit: {
		is: false,
		id: '',
	},
	image: '',
	input: {
		name: '',
		phone: '',
		work_time: '',
		fullAddress: '',
	},
};
const initial: OfflineShopState = getFromLocalStorage(SHOP_KEY) ?? {
	...init,
};
export const useOfflineShop = create<OfflineShop>((set) => ({
	...initial,
	setInputs: (input) =>
		set((state) => ({ input: { ...state.input, ...input } })),
	setImg: (image) => set({ image }),
	setEdit: (edit) => set({ edit }),
	setError: (error) => set({ error }),
	reset: () => set({ error: undefined }),
	clear: () => set(init),
}));
