import type { Product, ProductPriceHistory } from '@prisma/client';
import { createContext, useContext } from 'react';

export interface ProductCardContext {
	product: Product & {
		priceHistory: ProductPriceHistory[];
	};
}

const ProductCardContext = createContext<ProductCardContext | null>(null);

export function useProductCardContext() {
	const context = useContext(ProductCardContext);
	if (!context)
		throw new Error(
			'ProductCardContext.* component must be render as a child of ProductCardContext comopnent'
		);
	return context;
}

export default ProductCardContext;
