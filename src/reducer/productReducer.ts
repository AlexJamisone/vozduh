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

interface SetAddServiceAction {
	type: 'ADD_SERVICE';
	payload: AdditionalService;
}
interface SetUpdateServiceAction {
	type: 'UPDATE_SERVICE';
	payload: {
		index: number;
		title?: string;
		price?: string;
	};
}
interface SetRemoveServicesAction {
	type: 'REMOVE_SERVICE';
	payload: number;
}

interface SetClearAction {
	type: 'CLEAR';
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
	| SetClearAction;

export const initial: ProductState = {
	controlView: {
		category: false,
		editCategory: false,
		editProduct: false,
		editSize: false,
		product: false,
		size: false,
	},
	category: {
		image: '',
		title: '',
	},
	product: {
		id: '',
		category: '',
		description: '',
		image: [],
		name: '',
		price: '',
		size: [],
		serviceAvailability: [],
	},
	size: {
		value: '',
	},
};

export const productReducer = (
	state: ProductState,
	action: Action
): ProductState => {
	switch (action.type) {
		case 'SET_VIEW':
			return {
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
		case 'ADD_SERVICE': {
			const newService: AdditionalService = {
				id: action.payload.id,
				price: action.payload.price,
				title: action.payload.title,
			};
			return {
				...state,
				product: {
					...state.product,
					serviceAvailability: [
						...state.product.serviceAvailability,
						newService,
					],
				},
			};
		}
		case 'UPDATE_SERVICE': {
			const updateServices = state.product.serviceAvailability.map(
				(service, index) => {
					if (index === action.payload.index) {
						return {
							...service,
							title: action.payload.title ?? service.title,
							price: action.payload.price ?? service.price,
						};
					}
					return service;
				}
			);
			return {
				...state,
				product: {
					...state.product,
					serviceAvailability: updateServices,
				},
			};
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
			const newSizeArray = [...state.product.size];
			action.payload.size.forEach((size) => {
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
					category: action.payload.category,
					description: action.payload.description,
					image: action.payload.image,
					name: action.payload.name,
					price: action.payload.price,
					id: action.payload.id,
					size: newSizeArray,
					serviceAvailability: [...state.product.serviceAvailability],
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
			return initial;
		default:
			return state;
	}
};
