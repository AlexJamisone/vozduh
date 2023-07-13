import { createContext, useContext, type Dispatch } from 'react';
import type { typeToFlattenedError } from 'zod';
import type { Action, ProductState } from '~/reducer/productReducer';

export interface ProductContext {
	state: ProductState;
	dispatch: Dispatch<Action>;
	productError?: typeToFlattenedError<any, string> | null;
	handlCreateProduct: () => void;
	isErrorProduct: boolean;
	isLoadingProduct: boolean;
	resetProduct: () => void;
}

const ProductContext = createContext<ProductContext | null>(null);

export function useProductContext() {
	const context = useContext(ProductContext);
	if (!context)
		throw new Error(
			'Product.* component must be render as a child of Product comopnent'
		);
	return context;
}

export default ProductContext;
