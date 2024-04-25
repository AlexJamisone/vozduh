import { typeToFlattenedError } from 'zod';
import { create } from 'zustand';

type AboutState = {
	input: {
		title: string;
		content: string;
	};
	error?: {
		isError: boolean;
		path: typeToFlattenedError<any, string>;
	};
};
export type AboutInputName = keyof AboutState['input'];
export type AboutInputValue = AboutState['input'];

type AboutAction = {
	setInput: (input: Partial<AboutState['input']>) => void;
	setAll: (state: Partial<AboutState>) => void;
	setError: (error: AboutState['error']) => void;
	reset: () => void;
	clear: () => void;
};
const initial: AboutState = {
	input: {
		title: '',
		content: '',
	},
};
type About = AboutState & AboutAction;
export const useAbout = create<About>((set) => ({
	...initial,
	setInput: (input) =>
		set((state) => ({ input: { ...state.input, ...input } })),
	setAll: (s) => set((state) => ({ ...state, ...s })),
	setError: (error) => set({ error }),
	reset: () => set((state) => ({ ...state, error: undefined })),
	clear: () => set(initial),
}));
