import type { typeToFlattenedError } from 'zod';
import { create } from 'zustand';

type SizeState = {
	value: string;
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
type SizeAction = {
	setValue: (value: string) => void;
	setEdit: (edit: SizeState['edit']) => void;
	setError: (error: SizeState['error']) => void;

	reset: () => void;
	clear: () => void;
};

type Size = SizeState & SizeAction;
const init: SizeState = {
	edit: {
		is: false,
		id: '',
	},
	value: '',
};
export const useCreateSize = create<Size>((set) => ({
	...init,
	setValue: (value) => set({ value }),
	setEdit: (edit) => set({ edit }),
	setError: (error) => set({ error }),
	reset: () => set({ error: undefined }),
	clear: () => set(init),
}));
