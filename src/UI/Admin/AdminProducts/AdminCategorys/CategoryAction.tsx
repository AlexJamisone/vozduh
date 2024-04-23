import { Button, useToast } from '@chakra-ui/react';
import { useCreateCategory } from '~/store/useCreateCategory';
import { api } from '~/utils/api';

const CategoryAction = () => {
	const [edit, input, setError, image, clear] = useCreateCategory((state) => [
		state.edit,
		state.input,
		state.setError,
		state.image,
		state.clear,
	]);
	const toast = useToast();
	const ctx = api.useContext();
	const { mutate: create, isLoading: isCreating } =
		api.categorys.create.useMutation({
			onSuccess: (message) => {
				void ctx.categorys.invalidate();
				toast({
					description: message,
					status: 'success',
				});
				clear();
			},
			onError: ({ message, data }) => {
				if (data?.zodError) {
					setError({ is: true, path: data.zodError });
				} else {
					toast({
						description: message,
						status: 'error',
					});
				}
			},
		});
	const { mutate: update, isLoading: isUpdating } =
		api.categorys.update.useMutation({
			onSuccess: (message) => {
				void ctx.categorys.invalidate();
				toast({
					description: message,
					status: 'info',
				});
				clear();
			},
			onError: ({ message, data }) => {
				if (data?.zodError) {
					setError({ is: true, path: data.zodError });
				} else {
					toast({
						description: message,
						status: 'error',
					});
				}
			},
		});
	const handlCategory = () => {
		const { path, title } = input;
		if (edit.is && edit.id) {
			update({ id: edit.id, title, path, image });
			return;
		}
		create({ image, title, path });
	};
	return (
		<Button
			onClick={handlCategory}
			colorScheme={edit.is ? 'blue' : 'green'}
			variant="outline"
			isLoading={isCreating || isUpdating}
		>
			{edit.is ? 'Обновить' : 'Создать'}
		</Button>
	);
};
export default CategoryAction;
