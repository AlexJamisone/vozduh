import type { typeToFlattenedError } from 'zod';
import { create } from 'zustand';
import { getFromLocalStorage } from '~/helpers/getFromLocalStorage';

type ProductState = {
	tab: number;
	input: {
		name: string;
		description: string;
		price: number;
	};
	image: string[];
	size: string[];
	edit: {
		id: string;
		isEdit: boolean;
	};
	category: string;
	error?: {
		isError: boolean;
        // eslint-disable-next-line
		path: typeToFlattenedError<any, string>;
	};
};
export type ProductInputName = keyof ProductState['input'];
export type ProductInputValue = ProductState['input'];

type ProductAction = {
	setInputs: (input: ProductInputValue) => void;
	setTab: (idx: number) => void;
	setImage: (image: string[]) => void;
	setSize: (size: string) => void;
	setEdit: (edit: ProductState['edit']) => void;
	setCategory: (category: ProductState['category']) => void;
	setError: (error: ProductState['error']) => void;

	reset: () => void;
	clear: () => void;
	setAll: (state: ProductState) => void;
};
type CreateProduct = ProductState & ProductAction;
const KEY = 'create';
const init: ProductState = {
	category: '',
	edit: {
		isEdit: false,
		id: '',
	},
	input: {
		price: 0,
		name: '',
		description: '',
	},
	size: [],
	tab: 0,
	image: [],
};
const initial: ProductState = getFromLocalStorage(KEY) ?? {
	...init,
};
export const useCreateProduct = create<CreateProduct>((set) => ({
	...initial,
	setInputs: (input) =>
		set((state) => ({ input: { ...state.input, ...input } })),
	setTab: (tab) => set({ tab }),
	setError: (error) => set({ error }),
	setEdit: (edit) => set({ edit }),
	setSize: (size) =>
		set((state) => ({
			size: state.size.includes(size)
				? state.size.filter((s) => s !== size)
				: [...state.size, size],
		})),
	setImage: (image) => set({ image }),
	setCategory: (category) => set({ category }),
	reset: () => set({ error: undefined }),
	clear: () => set(init),
	setAll: (state) => set(state),
}));
