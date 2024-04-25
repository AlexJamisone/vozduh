import { create } from 'zustand';

export type Service = {
	serviceId: string;
	optionId: string;
	title: string;
	optionTitle: string;
	price: number;
};
type ProductDitailsState = {
	size: string;
	isSelect: boolean;
	warn: boolean;
	service: Service[];
};
type ProductDitailsAction = {
	setSize: (size: string) => void;
	setSelecte: (isSelect: boolean) => void;
	setService: (service: Service) => void;
	setWarn: (warn: boolean) => void;
	clear: () => void;
};
type ProductDitails = ProductDitailsState & ProductDitailsAction;
export const useProductDitails = create<ProductDitails>((set) => ({
	size: '',
	service: [],
	isSelect: false,
	warn: false,
	clear: () => set({ size: '', service: [], isSelect: false, warn: false }),
	setSize: (size) =>
		set((state) => ({
			size: state.size === size ? '' : size,
			isSelect: state.size === size ? false : true,
			warn: false,
		})),
	setWarn: (warn) => set({ warn }),
	setSelecte: (isSelect) => set({ isSelect }),
	setService: (service) =>
		set((state) => {
			const find = state.service.find(
				(serv) => serv.serviceId === service.serviceId
			);
			if (find) {
				if (service.optionId === '') {
					return {
						...state,
						service: state.service.filter(
							(serv) => serv.serviceId !== service.serviceId
						),
					};
				} else {
					return {
						...state,
						service: state.service.map((serv) =>
							serv.serviceId === service.serviceId
								? {
										...serv,
										optionId: service.optionId,
										optionTitle: service.optionTitle,
										price: service.price,
								  }
								: serv
						),
					};
				}
			} else {
				return {
					...state,
					service: [...state.service, service],
				};
			}
		}),
}));
