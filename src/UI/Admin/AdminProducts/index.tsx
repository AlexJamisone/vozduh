import { Button, Icon, IconButton, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useReducer, type ReactNode } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
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
