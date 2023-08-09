import { Button, Stack } from '@chakra-ui/react';
import { useProductContext } from '~/context/productContext';

const CreateProductAction = () => {
	const { isLoadingProduct, handlCreateProduct, state, dispatch } =
		useProductContext();
	return (
		<Stack>
			<Button
				isLoading={isLoadingProduct}
				isDisabled={isLoadingProduct}
				onClick={handlCreateProduct}
				colorScheme="telegram"
			>
				{state.controlView.editProduct
					? 'Обновить Товар'
					: 'Создать Товар'}
			</Button>
			{state.controlView.editProduct && (
				<Button
					colorScheme="red"
					onClick={() => {
						dispatch({
							type: 'SET_VIEW',
							payload: {
								...state.controlView,
								editProduct: !state.controlView.editProduct,
							},
						});
						dispatch({ type: 'CLEAR' });
					}}
				>
					Отмена
				</Button>
			)}
		</Stack>
	);
};

export default CreateProductAction;
