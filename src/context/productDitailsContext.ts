import type { Product, ProductPriceHistory, Size } from '@prisma/client';
import { createContext, useContext, type Dispatch } from 'react';
import type { AdditionalServiceWithOption } from '~/UI/Product/ProductCard';
import type {
	Action,
	ProductDitailsState,
} from '~/reducer/productDirailsReducer';

export interface ProductDitalsContext {
	product: Product & {
		priceHistory: ProductPriceHistory[];
		size: Size[];
		additionalServices?: AdditionalServiceWithOption[];
	};
	state: ProductDitailsState;
	dispatch: Dispatch<Action>;
}

const ProductDitalsContext = createContext<ProductDitalsContext | null>(null);

export function useProductDitalsContext() {
	const context = useContext(ProductDitalsContext);
	if (!context)
		throw new Error(
			'Product.* component must be render as a child of Product comopnent'
		);
	return context;
}

export default ProductDitalsContext;
