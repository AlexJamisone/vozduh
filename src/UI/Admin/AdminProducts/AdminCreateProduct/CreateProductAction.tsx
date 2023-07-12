import { Button, Stack, useToast } from '@chakra-ui/react';
import { useProductContext } from '~/context/productContext';
import { api } from '~/utils/api';

const CreateProductAction = () => {
	const { state, dispatch } = useProductContext();
	const { mutate: create, isLoading } = api.product.create.useMutation();
	const ctx = api.useContext();
	const toast = useToast();

	const handlClick = () => {
		create(
			{
				product: state.product,
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
	};
	return (
		<Stack>
			<Button
				isLoading={isLoading}
				isDisabled={isLoading}
				onClick={handlClick}
				colorScheme="telegram"
			>
				Создать товар
			</Button>
		</Stack>
	);
};

export default CreateProductAction;
