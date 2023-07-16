import { Button } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useProductContext } from '~/context/productContext';
type SizeButtonProps = {
	size: Size;
};

const SizeButton = ({ size }: SizeButtonProps) => {
	const { dispatch, state, errorProduct, isErrorProduct, resetProduct } =
		useProductContext();
	const error =
		isErrorProduct && errorProduct?.fieldErrors.size !== undefined;
	return (
		<Button
			isActive={state.product.size.includes(size.id)}
			border={error ? '1px solid' : undefined}
			borderColor={error ? 'red.300' : undefined}
			onClick={() => {
				resetProduct();
				dispatch({
					type: 'SET_PRODUCT_SIZE',
					payload: [size.id],
				});
			}}
		>
			{size.value}
		</Button>
	);
};

export default SizeButton;
