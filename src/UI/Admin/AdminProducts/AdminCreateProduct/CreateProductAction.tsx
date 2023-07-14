import { Button, Stack } from '@chakra-ui/react';
import { useProductContext } from '~/context/productContext';

const CreateProductAction = () => {
	const {
		isLoadingProduct,
		handlCreateProduct,
		state,
		dispatch,
		isLoadingUpdate,
	} = useProductContext();
	return (
		<Stack>
			<Button
				isLoading={isLoadingProduct || isLoadingUpdate}
				isDisabled={isLoadingProduct || isLoadingUpdate}
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
							type: 'CLEAR',
						});
					}}
				>
					Отмена
				</Button>
			)}
		</Stack>
	);
};

export default CreateProductAction;
