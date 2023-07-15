import { Button, Icon, IconButton, Stack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useReducer, type ReactNode } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { LiaRingSolid } from 'react-icons/lia';
import { RiAddFill } from 'react-icons/ri';
import ProductCard from '~/UI/ProductCard';
import NoData from '~/components/NoData';
import { productControllButton } from '~/constants/productControlButton';
import ProductContext from '~/context/productContext';
import { actionString } from '~/helpers/actionString';
import { initial, productReducer } from '~/reducer/productReducer';
import { api } from '~/utils/api';
import AdminCreateCategory from './AdminCreateCategory';
import AdminCreateProduct from './AdminCreateProduct';
import AdminCreateSize from './AdminCreateSize';

type AdminProductsProps = {
	product?: ReactNode;
	size?: ReactNode;
	category?: ReactNode;
};

const AdminProducts = ({ category, product, size }: AdminProductsProps) => {
	const [state, dispatch] = useReducer(productReducer, initial);
	const {
		mutate: create,
		isLoading: isLoadingProduct,
		reset: resetProduct,
		error: productError,
		isError: isErrorProduct,
	} = api.product.create.useMutation();

	const { mutate: update, isLoading: isLoadingUpdate } =
		api.product.update.useMutation();

	const { data: products } = api.product.getForAdmin.useQuery();
	const ctx = api.useContext();
	const toast = useToast();
	const handlCreateProduct = () => {
		// if (state.controlView.editProduct) {
		// 	update(
		// 		{
		// 			name: state.product.name,
		// 			description: state.product.description,
		// 			category: state.product.category,
		// 			price: state.product.price,
		// 			image: state.product.image,
		// 			size: state.product.size,
		// 			service: state.product.serviceAvailability,
		// 			producId: state.product.id,
		// 		},
		// 		{
		// 			onSuccess: () => {
		// 				void ctx.product.invalidate();
		// 				toast({
		// 					description: `Товар ${state.product.name} успешно обновлён`,
		// 					isClosable: true,
		// 					position: 'top-right',
		// 					status: 'info',
		// 				});
		// 				dispatch({ type: 'CLEAR' });
		// 			},
		// 		}
		// 	);
		// } else {
		// 	create(
		// 		{
		// 			name: state.product.name,
		// 			description: state.product.description,
		// 			category: state.product.category,
		// 			image: state.product.image,
		// 			price: state.product.price,
		// 			size: state.product.size,
		// 			service: state.product.serviceAvailability,
		// 		},
		// 		{
		// 			onSuccess: () => {
		// 				void ctx.product.invalidate();
		// 				toast({
		// 					description: `Товар ${state.product.name} успешно создан!`,
		// 					position: 'top-right',
		// 					status: 'success',
		// 					isClosable: true,
		// 				});
		// 				dispatch({
		// 					type: 'CLEAR',
		// 				});
		// 			},
		// 		}
		// 	);
		// }
	};
	const handlControl = (value: string) => {
		switch (value) {
			case 'Товар':
				dispatch({
					type: 'SET_VIEW',
					payload: {
						...state.controlView,
						product: true,
						category: false,
						size: false,
					},
				});
				break;
			case 'Размер':
				dispatch({
					type: 'SET_VIEW',
					payload: {
						...state.controlView,
						product: false,
						category: false,
						size: true,
					},
				});
				break;
			case 'Категория':
				dispatch({
					type: 'SET_VIEW',
					payload: {
						...state.controlView,
						product: false,
						category: true,
						size: false,
					},
				});
		}
	};

	return (
		<Stack alignItems="center">
			<Stack direction="row" as={motion.div} layout>
				{(state.controlView.category ||
					state.controlView.product ||
					state.controlView.size) && (
					<IconButton
						aria-label="back"
						icon={<Icon as={IoIosArrowBack} />}
						as={motion.button}
						initial={{ opacity: 0, x: 25 }}
						animate={{ opacity: 1, x: 0 }}
						onClick={() =>
							dispatch({
								type: 'SET_VIEW',
								payload: {
									...state.controlView,
									category: false,
									product: false,
									size: false,
								},
							})
						}
					/>
				)}
				{productControllButton({
					stateView: [
						state.controlView.product,
						state.controlView.size,
						state.controlView.category,
					],
					stateEdit: [
						state.controlView.editProduct,
						state.controlView.editSize,
						state.controlView.editCategory,
					],
				}).map(({ id, value, stateView, stateEdit }) => (
					<Button
						key={id}
						leftIcon={<Icon as={RiAddFill} boxSize={6} />}
						variant="outline"
						isActive={stateView}
						onClick={() => handlControl(value)}
					>
						{actionString(stateEdit)} {value}
					</Button>
				))}
			</Stack>
			<Stack>
				<ProductContext.Provider
					value={{
						dispatch,
						state,
						productError: productError?.data?.zodError,
						handlCreateProduct,
						isErrorProduct,
						isLoadingProduct,
						resetProduct,
						isLoadingUpdate,
					}}
				>
					{(state.controlView.product ||
						state.controlView.editProduct) &&
						product}
					{state.controlView.size && size}
					{state.controlView.category && category}
				</ProductContext.Provider>
			</Stack>
			{!state.controlView.product &&
				!state.controlView.category &&
				!state.controlView.size &&
				!state.controlView.editCategory &&
				!state.controlView.editProduct &&
				!state.controlView.editSize && (
					<Stack
						direction="row"
						justifyContent="center"
						flexWrap="wrap"
						gap={5}
					>
						{products?.length === 0 && (
							<NoData icon={LiaRingSolid} title="Нет товаров" />
						)}
						{products?.map((product, index) => (
							<ProductCard
								key={product.id}
								product={product}
								image={<ProductCard.Image />}
								role="ADMIN"
								index={index}
								dispatch={dispatch}
								state={state}
							/>
						))}
					</Stack>
				)}
		</Stack>
	);
};

AdminProducts.Product = AdminCreateProduct;
AdminProducts.Size = AdminCreateSize;
AdminProducts.Category = AdminCreateCategory;

export default AdminProducts;
