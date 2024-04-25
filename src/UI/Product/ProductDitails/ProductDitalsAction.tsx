import {
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	useToast,
} from '@chakra-ui/react';
import { SignedIn } from '@clerk/nextjs';
import { GoHeart } from 'react-icons/go';
import { useCart } from '~/store/useCart';
import { useProductDitails } from '~/store/useProductDitails';
import { api } from '~/utils/api';

const ProductDitalsAction = ({
	item,
}: {
	item: {
		id: string;
		price: number;
		img: string;
		name: string;
		size: string;
	};
}) => {
	const [add] = useCart((state) => [state.add]);
	const service = useProductDitails((state) => state.service);
	const { data: userFav } = api.favorites.get.useQuery();
	const { mutate: addOrRemove } = api.favorites.addOrRemove.useMutation({
		onSuccess: () => {
			void ctx.favorites.invalidate();
			toast({
				description: 'Успешно',
				status: 'loading',
				duration: 1000,
			});
		},
	});
	const toast = useToast();
	const ctx = api.useContext();
	function handlAdd() {
		const { price, name, size, img, id } = item;
		add({ price, name, size, img, id, service });
	}
	console.log(service);
	return (
		<ButtonGroup isAttached w="100%" gap={1}>
			<Button onClick={handlAdd} colorScheme="telegram" w="100%">
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
									({ productId }) => productId === item.id
								)
									? 'red.400'
									: undefined
							}
							transition="color .3s linear"
						/>
					}
					onClick={() => addOrRemove({ id: item.id })}
				/>
			</SignedIn>
		</ButtonGroup>
	);
};

export default ProductDitalsAction;
