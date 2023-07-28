import {
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	useToast,
} from '@chakra-ui/react';
import { SignedIn } from '@clerk/nextjs';
import { GoHeart } from 'react-icons/go';
import { useCart } from '~/context/cartContext';
import { useProductDitalsContext } from '~/context/productDitailsContext';
import { api } from '~/utils/api';

const ProductDitalsAction = () => {
	const { dispatchCart } = useCart();
	const { product, state, dispatch } = useProductDitalsContext();
	const { data: userFav } = api.favorites.get.useQuery();
	const { mutate: addOrRemove } = api.favorites.addOrRemove.useMutation();
	const toast = useToast();
	const ctx = api.useContext();
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
								size: {
									id: state.size.id,
									value: state.size.value,
								},
								quantity: 1,
								additionalOptions: state.additionalServ,
							},
						});
						toast({
							description: `Товар ${product.name} была добавлен в корзину`,
							isClosable: true,
							status: 'success',
							position: 'top-right',
							duration: 1500,
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
			<SignedIn>
				<IconButton
					aria-label="favorites"
					icon={
						<Icon
							as={GoHeart}
							boxSize={6}
							color={
								userFav?.favorites.some(
									({ productId }) => productId === product.id
								)
									? 'red.400'
									: undefined
							}
							transition="color .3s linear"
						/>
					}
					onClick={() =>
						addOrRemove(
							{ id: product.id },
							{
								onSuccess: () => {
									void ctx.favorites.invalidate();
									toast({
										description: 'Успешно',
										isClosable: true,
										position: 'top-right',
										status: 'loading',
										duration: 1000,
									});
								},
							}
						)
					}
				/>
			</SignedIn>
		</ButtonGroup>
	);
};

export default ProductDitalsAction;
