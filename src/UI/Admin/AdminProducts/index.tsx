import { Button, Icon, Stack } from '@chakra-ui/react';
import { useReducer, type ReactNode } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { productControllButton } from '~/constants/productControlButton';
import ProductContext from '~/context/productContext';
import { actionString } from '~/helpers/actionString';
import { initial, productReducer } from '~/reducer/productReducer';
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
	const handlClick = (value: string) => {
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
		<Stack>
			<Stack direction="row">
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
						onClick={() => handlClick(value)}
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
					}}
				>
					{state.controlView.product && product}
					{state.controlView.size && size}
					{state.controlView.category && category}
				</ProductContext.Provider>
			</Stack>
		</Stack>
	);
};

AdminProducts.Product = AdminCreateProduct;
AdminProducts.Size = AdminCreateSize;
AdminProducts.Category = AdminCreateCategory;

export default AdminProducts;
