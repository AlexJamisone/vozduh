import type { DaDataAddressSuggestion } from 'react-dadata';
import type { typeToFlattenedError } from 'zod';
import { create } from 'zustand';
import type { FiltredPoint } from '~/server/api/routers/cdek';

type AddressState = {
	input: {
		firstName: string;
		lastName: string;
		contactPhone: string;
		comment: string;
	};
	controller: {
		showMap: boolean;
		showPVZ: boolean;
		isSelected: boolean;
		saveAddress: boolean;
	};
	point?: {
		points?: FiltredPoint[];
		selected?: FiltredPoint;
		valueSuggestion?: DaDataAddressSuggestion;
	};
	edit: {
		is: boolean;
		id: string;
	};
	error?: {
		isError: boolean;
        // eslint-disable-next-line
		path: typeToFlattenedError<any, string>;
	};
};
export type AddressInputName = keyof AddressState['input'];
export type AddressInputValue = AddressState['input'];

type AddressAction = {
	setInput: (input: AddressInputValue) => void;
	setController: (controller: Partial<AddressState['controller']>) => void;
	setEdit: (edit: AddressState['edit']) => void;
	setPoint: (point: AddressState['point']) => void;
	setError: (error: AddressState['error']) => void;

	reset: () => void;
	clear: () => void;
};

type Address = AddressState & AddressAction;
const initial: AddressState = {
	edit: {
		id: '',
		is: false,
	},
	input: {
		firstName: '',
		lastName: '',
		contactPhone: '',
		comment: '',
	},
	controller: {
		showMap: false,
		showPVZ: false,
		isSelected: false,
		saveAddress: false,
	},
	point: undefined,
};

export const useAddress = create<Address>((set) => ({
	...initial,
	setInput: (input) =>
		set((state) => ({ input: { ...state.input, ...input } })),
	setController: (controller) =>
		set((state) => ({
			controller: { ...state.controller, ...controller },
		})),
	setEdit: (edit) => set((state) => ({ edit: { ...state.edit, ...edit } })),
	setPoint: (point) =>
		set((state) => ({ point: { ...state.point, ...point } })),
	setError: (error) => set({ error }),
	reset: () => set({ error: undefined }),
	clear: () => set(initial),
}));
