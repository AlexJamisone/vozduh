import { createContext, useContext, type Dispatch } from 'react';
import type { Action, ShopState } from '~/reducer/shopReducer';

export interface OfflineShopContext {
	state: ShopState;
	dispatch: Dispatch<Action>;
}

const OfflineShopContext = createContext<OfflineShopContext | null>(null);

export function useOfflineShopContext() {
	const context = useContext(OfflineShopContext);
	if (!context)
		throw new Error(
			'OfflineShop.* component must be render as a child of OfflineShop comopnent'
		);
	return context;
}

export default OfflineShopContext;
