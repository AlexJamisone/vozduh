import { Button, useToast } from '@chakra-ui/react';
import { useCreateCategory } from '~/store/useCreateCategory';
import { api } from '~/utils/api';

const CategoryAction = () => {
	const [edit, input, setError, image] = useCreateCategory((state) => [
		state.edit,
		state.input,
		state.setError,
		state.image,
	]);
	const toast = useToast();
	const ctx = api.useContext();
	const { mutate: create } = api.categorys.create.useMutation({
		onSuccess: ({ message }) => {
			void ctx.categorys.invalidate();
			toast({
				description: message,
				status: 'success',
				position: 'top-right',
			});
		},
		onError: ({ message, data }) => {
			if (data?.zodError) {
				setError({ is: true, path: data.zodError });
			} else {
				toast({
					description: message,
					status: 'error',
					isClosable: true,
					position: 'top-right',
				});
			}
		},
	});
	const { mutate: update } = api.categorys.update.useMutation({
		onSuccess: ({ message }) => {
			void ctx.categorys.invalidate();
			toast({
				description: message,
				status: 'info',
				position: 'top-right',
			});
		},
		onError: ({ message, data }) => {
			if (data?.zodError) {
				setError({ is: true, path: data.zodError });
			} else {
				toast({
					description: message,
					status: 'error',
					isClosable: true,
					position: 'top-right',
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
		>
			{edit.is ? 'Обновить' : 'Создать'}
		</Button>
	);
};
export default CategoryAction;
