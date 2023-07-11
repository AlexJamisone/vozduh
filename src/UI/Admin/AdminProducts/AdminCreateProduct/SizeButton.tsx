import { Button } from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { useProductContext } from '~/context/productContext';
type SizeButtonProps = {
	size: Size;
};

const SizeButton = ({ size }: SizeButtonProps) => {
	const { dispatch, state } = useProductContext();
	return (
		<Button
			isActive={state.product.size.includes(size.id)}
			onClick={() =>
				dispatch({
					type: 'SET_PRODUCT',
					payload: {
						...state.product,
						size: [size.id],
					},
				})
			}
		>
			{size.value}
		</Button>
	);
};

export default SizeButton;
