import type { typeToFlattenedError } from 'zod';
import { create } from 'zustand';
import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '~/helpers/getFromLocalStorage';

type CategoryState = {
	input: {
		title: string;
		path: string;
	};
	image: string;
	edit: {
		is: boolean;
		id: string;
	};
	error?: {
		is: boolean;
		path: typeToFlattenedError<any, string>;
	};
};
export type CategoryInputName = keyof CategoryState['input'];
export type CategoryInputValue = CategoryState['input'];
type CategoryAction = {
	setInputs: (input: CategoryInputValue) => void;
	setEdit: (edit: CategoryState['edit']) => void;
	setError: (error: CategoryState['error']) => void;
	setImg: (img: string) => void;

	reset: () => void;
	clear: () => void;
};

const CAT_KEY = 'category';
const init: CategoryState = {
	edit: {
		id: '',
		is: false,
	},
	image: '',
	input: {
		path: '',
		title: '',
	},
};
const initial: CategoryState = getFromLocalStorage(CAT_KEY) ?? {
	...init,
};
type Category = CategoryState & CategoryAction;
export const useCreateCategory = create<Category>((set) => ({
	...initial,
	setInputs: (input) => {
		set((state) => {
			const newState: CategoryInputValue = { ...state.input, ...input };
			saveToLocalStorage(newState, CAT_KEY);
			return { ...state, newState };
		});
	},
	setEdit: (edit) => set({ edit }),
	setError: (error) => set({ error }),
	setImg: (image) =>
		set((state) => {
			saveToLocalStorage(image, CAT_KEY);
			return { ...state, image };
		}),
	reset: () => set({ error: undefined }),
	clear: () => set(init),
}));
