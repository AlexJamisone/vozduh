export type Product = {
	id: string;
	name: string;
	description: string;
	price: string;
	category: string;
	image: string[];
	size: string[];
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

export type Action =
	| SetCategoryAction
	| SetProductAction
	| SetViewAction
	| SetSizeAction
	| SetAllAction;

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
		default:
			return state;
	}
};
