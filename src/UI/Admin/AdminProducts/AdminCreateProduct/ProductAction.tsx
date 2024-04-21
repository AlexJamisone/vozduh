import { Button, useToast } from '@chakra-ui/react';
import { useCreateProduct } from '~/store/useCreateProduct';
import { api } from '~/utils/api';

export default function ProductAction() {
	const toast = useToast();
	const ctx = api.useContext();
	const { mutate: create, isLoading: isCreate } =
		api.product.create.useMutation({
			onSuccess: (name) => {
				void ctx.product.invalidate();
				toast({
					description: `Товар ${name} успешно создан`,
					status: 'success',
					position: 'top-right',
					isClosable: true,
				});
				clear();
				setTab(0);
			},
			onError: ({ data, message }) => {
				if (data?.zodError) {
					setError({ isError: true, path: data.zodError });
				} else {
					toast({
						description: message,
						status: 'error',
						position: 'top-right',
						isClosable: true,
					});
				}
			},
		});
	const { mutate: update, isLoading: isUpdate } =
		api.product.update.useMutation({
			onSuccess: (name) => {
				void ctx.product.invalidate();
				toast({
					description: `Товар ${name} успешно создан`,
					status: 'success',
					position: 'top-right',
					isClosable: true,
				});
				clear();
				setTab(0);
			},
			onError: ({ data, message }) => {
				if (data?.zodError) {
					setError({ isError: true, path: data.zodError });
				} else {
					toast({
						description: message,
						status: 'error',
						position: 'top-right',
						isClosable: true,
					});
				}
			},
		});
	const [edit, state, clear, setTab, setError] = useCreateProduct((state) => [
		state.edit,
		state,
		state.clear,
		state.setTab,
		state.setError,
	]);
	function handlAction() {
		const {
			category,
			size,
			image,
			input: { name, price, description },
			serviceAvailability,
		} = state;
		if (edit.isEdit) {
			update({
				image,
				size,
				category,
				name,
				description,
				price,
				producId: edit.id,
				service: serviceAvailability.map(
					({ id, title, additionalOptions }) => ({
						id,
						title,
						additionalOptions: additionalOptions.map((opt) => ({
							id: opt.id,
							price: opt.price,
							name: opt.name,
						})),
					})
				),
			});
			return;
		}
		create({
			name,
			price,
			description,
			category,
			size,
			image,
			service: serviceAvailability.map(
				({ id, title, additionalOptions }) => ({
					id,
					title,
					additionalOptions: additionalOptions.map((opt) => ({
						id: opt.id,
						price: opt.price,
						name: opt.name,
					})),
				})
			),
		});
	}
	return (
		<Button onClick={handlAction} isLoading={isCreate || isUpdate}>
			{edit.isEdit ? 'Обновить' : 'Создать'}
		</Button>
	);
}
