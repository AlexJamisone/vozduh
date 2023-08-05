import {
	getFromLocalStorage,
	saveToLocalStorage,
} from '~/helpers/getFromLocalStorage';

export type Product = {
	id: string;
	name: string;
	description: string;
	price: string;
	category: string;
	image: string[];
	size: string[];
	serviceAvailability: AdditionalService[];
};

type AdditionalService = {
	id: string;
	title: string;
	additionalOptions: AdditionalServiceOption[];
};

type AdditionalServiceOption = {
	id: string;
	name: string;
	price: string;
};

export type ProductState = {
	controlView: {
		product: boolean;
		size: boolean;
		category: boolean;
		editProduct: boolean;
		editSize: boolean;
		editCategory: boolean;
	};
	product: Product;
	size: {
		value: string;
	};
	category: {
		title: string;
		image: string;
	};
};

interface SetViewAction {
	type: 'SET_VIEW';
	payload: {
		product: boolean;
		size: boolean;
		category: boolean;
		editProduct: boolean;
		editSize: boolean;
		editCategory: boolean;
	};
}

interface SetProductAction {
	type: 'SET_PRODUCT';
	payload: Product;
}

interface SetSizeAction {
	type: 'SET_SIZE';
	payload: string;
}
interface SetIncomeServiceAction {
	type: 'INCOME_SERVICE';
	payload: AdditionalService[];
}

interface SetCategoryAction {
	type: 'SET_CATEGORY';
	payload: {
		title: string;
		image: string;
	};
}
interface SetAllAction {
	type: 'SET_ALL';
	payload: ProductState;
}

interface SetClearAction {
	type: 'CLEAR';
}
interface SetProductSizeAction {
	type: 'SET_PRODUCT_SIZE';
	payload: string[];
}

//Service

interface SetAddOptionAction {
	type: 'ADD_OPTION';
	payload: {
		serviceIndex: number;
	};
}
interface SetUpdateOptionsActions {
	type: 'UPDATE_OPTIONS';
	payload: {
		serviceIndex: number;
		optionIndex: number;
		name?: string;
		price?: string;
	};
}
interface SetRemoveOptionsAction {
	type: 'REMOVE_OPTIONS';
	payload: {
		serviceIndex: number;
		optionIndex: number;
	};
}
interface SetAddServiceAction {
	type: 'ADD_SERVICE';
	payload: {
		serviceId: string;
		title: string;
		optionsId: string;
		name: string;
		price: string;
	};
}
interface SetUpdateServiceAction {
	type: 'UPDATE_SERVICE';
	payload: {
		index: number;
		title?: string;
	};
}
interface SetRemoveServicesAction {
	type: 'REMOVE_SERVICE';
	payload: number;
}

export type Action =
	| SetCategoryAction
	| SetProductAction
	| SetViewAction
	| SetSizeAction
	| SetAllAction
	| SetAddServiceAction
	| SetUpdateServiceAction
	| SetRemoveServicesAction
	| SetClearAction
	| SetProductSizeAction
	| SetRemoveOptionsAction
	| SetUpdateOptionsActions
	| SetAddOptionAction
	| SetIncomeServiceAction;

const LOCAL_STORAGE_KEY = 'createProduct';
const state = {
	controlView: {
		category: false,
		editCategory: false,
		editProduct: false,
		editSize: false,
		size: false,
		product: false,
	},
	category: {
		image: '',
		title: '',
	},
	product: {
		category: '',
		description: '',
		id: '',
		name: '',
		price: '',
		image: [],
		serviceAvailability: [],
		size: [],
	},
	size: {
		value: '',
	},
};
export const initial: ProductState =
	getFromLocalStorage<ProductState>(LOCAL_STORAGE_KEY) || state;

export const productReducer = (
	state: ProductState,
	action: Action
): ProductState => {
	switch (action.type) {
		case 'SET_VIEW':
			const newState = {
				...state,
				controlView: {
					category: action.payload.category,
					editCategory: action.payload.editCategory,
					editProduct: action.payload.editProduct,
					editSize: action.payload.editSize,
					product: action.payload.product,
					size: action.payload.size,
				},
			};
			saveToLocalStorage(newState, LOCAL_STORAGE_KEY);
			return newState;
		case 'INCOME_SERVICE': {
			const newState = {
				...state,
				product: {
					...state.product,
					serviceAvailability: action.payload,
				},
			};
			saveToLocalStorage(newState, LOCAL_STORAGE_KEY);
			return newState;
		}
		case 'ADD_SERVICE': {
			const newState = {
				...state,
				product: {
					...state.product,
					serviceAvailability: [
						...state.product.serviceAvailability,
						{
							id: action.payload.serviceId,
							title: action.payload.title,
							additionalOptions: [
								{
									id: action.payload.optionsId,
									name: action.payload.name,
									price: action.payload.price,
								},
							],
						},
					],
				},
			};
			saveToLocalStorage(newState, LOCAL_STORAGE_KEY);
			return newState;
		}
		case 'UPDATE_SERVICE': {
			const newState = {
				...state,
				product: {
					...state.product,
					serviceAvailability: state.product.serviceAvailability.map(
						(service, index) => {
							if (index === action.payload.index) {
								return {
									...service,
									title:
										action.payload.title ?? service.title,
								};
							}
							return service;
						}
					),
				},
			};
			saveToLocalStorage(newState, LOCAL_STORAGE_KEY);
			return newState;
		}
		case 'UPDATE_OPTIONS': {
			const newState = {
				...state,
				product: {
					...state.product,
					serviceAvailability: state.product.serviceAvailability.map(
						(service, serviceIndex) => {
							if (serviceIndex === action.payload.serviceIndex) {
								return {
									...service,
									additionalOptions:
										service.additionalOptions.map(
											(option, optionIndex) => {
												if (
													optionIndex ===
													action.payload.optionIndex
												) {
													return {
														...option,
														name:
															action.payload
																.name ??
															option.name,
														price:
															action.payload
																.price ??
															option.price,
													};
												}
												return option;
											}
										),
								};
							}
							return service;
						}
					),
				},
			};
			saveToLocalStorage(newState, LOCAL_STORAGE_KEY);
			return newState;
		}
		case 'ADD_OPTION': {
			return {
				...state,
				product: {
					...state.product,
					serviceAvailability: state.product.serviceAvailability.map(
						(service, index) => {
							if (index === action.payload.serviceIndex) {
								return {
									...service,
									additionalOptions: [
										...service.additionalOptions,
										{
											id: '',
											name: '',
											price: '',
										},
									],
								};
							}
							return service;
						}
					),
				},
			};
		}
		case 'REMOVE_OPTIONS': {
			const newState = {
				...state,
				product: {
					...state.product,
					serviceAvailability: state.product.serviceAvailability.map(
						(service, serviceIndex) => {
							if (serviceIndex === action.payload.serviceIndex) {
								return {
									...service,
									additionalOptions:
										service.additionalOptions.filter(
											(option, optionIndex) => {
												return (
													optionIndex !==
													action.payload.optionIndex
												);
											}
										),
								};
							}
							return service;
						}
					),
				},
			};
			saveToLocalStorage(newState, LOCAL_STORAGE_KEY);
			return newState;
		}
		case 'REMOVE_SERVICE': {
			const updateServices = state.product.serviceAvailability.filter(
				(_, index) => index !== action.payload
			);
			return {
				...state,
				product: {
					...state.product,
					serviceAvailability: updateServices,
				},
			};
		}
		case 'SET_PRODUCT': {
			const newState = {
				...state,
				product: {
					category: action.payload.category,
					description: action.payload.description,
					image: action.payload.image,
					name: action.payload.name,
					price: action.payload.price,
					id: action.payload.id,
					size: [...state.product.size],
					serviceAvailability: [...state.product.serviceAvailability],
				},
			};
			saveToLocalStorage(newState, LOCAL_STORAGE_KEY);
			return newState;
		}
		case 'SET_PRODUCT_SIZE': {
			const newSizeArray = [...state.product.size];
			action.payload.forEach((size) => {
				const sizeIndex = newSizeArray.indexOf(size);
				if (sizeIndex === -1) {
					newSizeArray.push(size);
				} else {
					newSizeArray.splice(sizeIndex, 1);
				}
			});
			return {
				...state,
				product: {
					...state.product,
					size: newSizeArray,
				},
			};
		}
		case 'SET_CATEGORY':
			return {
				...state,
				category: {
					image: action.payload.image,
					title: action.payload.title,
				},
			};
		case 'SET_SIZE':
			return {
				...state,
				size: {
					value: action.payload,
				},
			};
		case 'SET_ALL':
			return { ...state, ...action.payload };
		case 'CLEAR':
			saveToLocalStorage(initial, LOCAL_STORAGE_KEY);
			return initial;
		default:
			return state;
	}
};
