import { create } from 'zustand';

type ProductDitailsState = {
	size: string;
	isSelect: boolean;
};
type ProductDitailsAction = {
	setSize: (size: string) => void;
	setSelecte: (isSelect: boolean) => void;
};
type ProductDitails = ProductDitailsState & ProductDitailsAction;
export const useProductDitails = create<ProductDitails>((set) => ({
	size: '',
	isSelect: false,
	setSize: (size) =>
		set((state) => ({
			size: state.size === size ? '' : size,
			isSelect: state.size === size ? false : true,
		})),
	setSelecte: (isSelect) => set({ isSelect }),
}));
