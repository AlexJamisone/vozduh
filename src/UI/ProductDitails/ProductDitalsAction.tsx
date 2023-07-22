import {
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	useToast,
} from '@chakra-ui/react';
import { GoHeart } from 'react-icons/go';
import { useCart } from '~/context/cartContext';
import { useProductDitalsContext } from '~/context/productDitailsContext';

const ProductDitalsAction = () => {
	const { cart, dispatchCart } = useCart();
	const { product, state, dispatch } = useProductDitalsContext();
	const toast = useToast();
	console.log(cart);
	return (
		<ButtonGroup isAttached w="100%" gap={1}>
			<Button
				onClick={() => {
					if (!state.size.isSelected && product.size.length !== 0) {
						dispatch({ type: 'SIZE_ERROR', payload: true });
						toast({
							description: 'Пожалуйста выбери размер!',
							isClosable: true,
							position: 'top-right',
							status: 'warning',
							duration: 3000,
						});
					} else {
						dispatchCart({
							type: 'ADD',
							payload: {
								id: product.id,
								image: product.image[0] ?? '',
								name: product.name,
								price: product.priceHistory[0]?.price ?? 0,
								sizeId: state.size.id,
								quantity: 1,
								additionalOptions: state.additionalServ,
							},
						});
						toast({
							description: `Товар ${product.name} была добавлен в корзину`,
							isClosable: true,
							status: 'success',
						});
						dispatch({
							type: 'CLEAR',
						});
					}
				}}
				colorScheme="telegram"
				w="100%"
			>
				Добавить в корзину
			</Button>
			<IconButton aria-label="favorites" icon={<Icon as={GoHeart} />} />
		</ButtonGroup>
	);
};

export default ProductDitalsAction;
