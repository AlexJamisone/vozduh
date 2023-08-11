import { Stack, useToast } from '@chakra-ui/react';
import { useReducer, type ReactNode } from 'react';
import { LiaRingSolid } from 'react-icons/lia';
import ProductCard from '~/UI/Product/ProductCard';
import NoData from '~/components/NoData';
import ProductContext from '~/context/productContext';
import { initial, productReducer } from '~/reducer/productReducer';
import { api } from '~/utils/api';
import AdminCategorys from './AdminCategorys';
import AdminCreateProduct from './AdminCreateProduct';
import AdminNavigationMenu from './AdminNavigationMenu';
import AdminSize from './AdminSize';

type AdminProductsProps = {
	product?: ReactNode;
	size?: ReactNode;
	category?: ReactNode;
	menu?: ReactNode;
};

const AdminProducts = ({
	category,
	product,
	size,
	menu,
}: AdminProductsProps) => {
	const [state, dispatch] = useReducer(productReducer, initial);
	const {
		mutate: create,
		isLoading: isLoadingCreateProduct,
		reset: resetProduct,
		error: errorCreateProduct,
		isError: isErrorCreateProduct,
	} = api.product.create.useMutation();

	const {
		mutate: update,
		isLoading: isLoadingUpdate,
		error: errorUpdateProduct,
		isError: isErrorUpdateProduct,
	} = api.product.update.useMutation();

	const { data: products } = api.product.getForAdmin.useQuery();
	const ctx = api.useContext();
	const toast = useToast();
	const handlCreateProduct = () => {
		if (state.controlView.editProduct) {
			update(
				{
					name: state.product.name,
					description: state.product.description.split(/\n/g),
					category: state.product.category,
					price: state.product.price,
					image: state.product.image,
					size: state.product.size,
					service: state.product.serviceAvailability,
					producId: state.product.id,
				},
				{
					onSuccess: () => {
						void ctx.product.invalidate();
						toast({
							description: `Товар ${state.product.name} успешно обновлён`,
							isClosable: true,
							position: 'top-right',
							status: 'info',
						});
						dispatch({ type: 'CLEAR' });
					},
				}
			);
		} else {
			create(
				{
					name: state.product.name,
					description: state.product.description.split(/\n/g),
					category: state.product.category,
					image: state.product.image,
					price: state.product.price,
					size: state.product.size,
					service: state.product.serviceAvailability,
				},
				{
					onSuccess: () => {
						void ctx.product.invalidate();
						toast({
							description: `Товар ${state.product.name} успешно создан!`,
							position: 'top-right',
							status: 'success',
							isClosable: true,
						});
						dispatch({
							type: 'CLEAR',
						});
					},
				}
			);
		}
	};

	return (
		<Stack alignItems="center">
			<Stack>
				<ProductContext.Provider
					value={{
						dispatch,
						state,
						errorProduct:
							errorCreateProduct?.data?.zodError ||
							errorUpdateProduct?.data?.zodError,
						handlCreateProduct,
						isErrorProduct:
							isErrorCreateProduct || isErrorUpdateProduct,
						isLoadingProduct:
							isLoadingCreateProduct || isLoadingUpdate,
						resetProduct,
					}}
				>
					{menu}
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
AdminProducts.Size = AdminSize;
AdminProducts.Category = AdminCategorys;
AdminProducts.Menu = AdminNavigationMenu;

export default AdminProducts;
