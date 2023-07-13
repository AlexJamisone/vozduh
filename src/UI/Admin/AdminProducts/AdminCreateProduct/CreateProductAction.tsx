import { Button, Stack } from '@chakra-ui/react';
import { useProductContext } from '~/context/productContext';

const CreateProductAction = () => {
	const { isLoadingProduct, handlCreateProduct } = useProductContext();
	return (
		<Stack>
			<Button
				isLoading={isLoadingProduct}
				isDisabled={isLoadingProduct}
				onClick={handlCreateProduct}
				colorScheme="telegram"
			>
				Создать товар
			</Button>
		</Stack>
	);
};

export default CreateProductAction;
