import {
	createContext,
	useContext,
	useReducer,
	type Dispatch,
	type ReactNode,
} from 'react';

import {
	cartReducer,
	initial,
	type Action,
	type CartState,
} from '~/reducer/cartReducer';

type CartContextType = {
	cart: CartState;
	dispatchCart: Dispatch<Action>;
};

const CartContext = createContext<CartContextType>({
	cart: initial,
	dispatchCart: () => null,
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, dispatchCart] = useReducer(cartReducer, initial);
	return (
		<CartContext.Provider value={{ cart, dispatchCart }}>
			{children}
		</CartContext.Provider>
	);
};
