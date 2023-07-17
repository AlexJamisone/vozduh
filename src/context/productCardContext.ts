import type { Product, ProductPriceHistory, Size } from '@prisma/client';
import { createContext, useContext } from 'react';
import type { AdditionalServiceWithOption } from '~/UI/ProductCard';

export interface ProductCardContext {
	product: Product & {
		priceHistory: ProductPriceHistory[];
		size: Size[];
		additionalServices?: AdditionalServiceWithOption[];
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
