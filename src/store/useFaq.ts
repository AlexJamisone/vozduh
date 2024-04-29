import type { typeToFlattenedError } from 'zod';
import { create } from 'zustand';

type FaqState = {
	input: {
		title: string;
		content: string;
	};
	edit: {
		is: boolean;
		id: string;
	};
	error?: {
		is: boolean;
        // eslint-disable-next-line
		path: typeToFlattenedError<any, string>;
	};
};
export type FaqInputName = keyof FaqState['input'];
export type FaqInputValue = FaqState['input'];

type FaqAction = {
	setInput: (input: FaqInputValue) => void;
	setEdit: (edit: FaqState['edit']) => void;
	setAll: (state: Partial<FaqState>) => void;
	setError: (error: FaqState['error']) => void;

	reset: () => void;
	clear: () => void;
};

type Faq = FaqState & FaqAction;
const init: FaqState = {
	input: {
		content: '',
		title: '',
	},
	edit: {
		is: false,
		id: '',
	},
};

export const useFaq = create<Faq>((set) => ({
	...init,
	setInput: (input) =>
		set((state) => ({ input: { ...state.input, ...input } })),
	setEdit: (edit) => set({ edit }),
	setAll: (state) => set(state),
	setError: (error) => set({ error }),
	reset: () => set({ error: undefined }),
	clear: () => set(init),
}));
