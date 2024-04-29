import { v4 as uuid } from 'uuid';
import { create } from 'zustand';

export type AdditionalOption = {
	id: string;
	name: string;
	price: number;
};

export type AdditionalService = {
	id: string;
	title: string;
	additionalOptions: AdditionalOption[];
};
type AdditionalServiceState = {
	additionalServices: AdditionalService[];
};
type AdditionalServiceAction = {
	addService: () => void;
	removeService: (id: string) => void;
	setTitle: (id: string, title: string) => void;
	addOption: (id: string, option: AdditionalOption) => void;
	setOption: (
		serviceId: string,
		optionId: string,
		name: string,
		price: number
	) => void;
	removeOption: (serviceId: string, optionId: string) => void;
	clear: () => void;
	setAll: (state: AdditionalServiceState) => void;
};

type Additional = AdditionalServiceState & AdditionalServiceAction;

export const useAdditionalService = create<Additional>((set) => ({
	additionalServices: [],

	addService: () =>
		set((state) => ({
			additionalServices: [
				...state.additionalServices,
				{
					id: uuid(),
					title: '',
					additionalOptions: [{ id: uuid(), price: 0, name: '' }],
				},
			],
		})),

	removeService: (id) =>
		set((state) => ({
			additionalServices: state.additionalServices.filter(
				(service) => service.id !== id
			),
		})),

	setTitle: (id, title) =>
		set((state) => ({
			additionalServices: state.additionalServices.map((service) =>
				service.id === id ? { ...service, title: title } : service
			),
		})),

	addOption: (id, option) =>
		set((state) => ({
			additionalServices: state.additionalServices.map((service) =>
				service.id === id
					? {
							...service,
							additionalOptions: [
								...service.additionalOptions,
								option,
							],
					  }
					: service
			),
		})),

	setOption: (serviceId, optionId, name, price) =>
		set((state) => ({
			additionalServices: state.additionalServices.map((service) =>
				service.id === serviceId
					? {
							...service,
							additionalOptions: service.additionalOptions.map(
								(option) =>
									option.id === optionId
										? { ...option, name, price }
										: option
							),
					  }
					: service
			),
		})),

	removeOption: (serviceId, optionId) =>
		set((state) => ({
			additionalServices: state.additionalServices.map((service) =>
				service.id === serviceId
					? {
							...service,
							additionalOptions: service.additionalOptions.filter(
								(option) => option.id !== optionId
							),
					  }
					: service
			),
		})),
	clear: () => set({ additionalServices: [] }),
	setAll: (state) => set(state),
}));
