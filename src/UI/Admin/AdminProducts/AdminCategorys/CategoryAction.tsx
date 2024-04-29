import {
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	useToast,
} from '@chakra-ui/react';
import { MdOutlineCancel } from 'react-icons/md';
import { useCreateCategory } from '~/store/useCreateCategory';
import { api } from '~/utils/api';

const CategoryAction = () => {
	const [edit, input, setError, image, clear, setEdit] = useCreateCategory(
		(state) => [
			state.edit,
			state.input,
			state.setError,
			state.image,
			state.clear,
			state.setEdit,
		]
	);
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
		<ButtonGroup>
			<Button
				w="100%"
				onClick={handlCategory}
				colorScheme={edit.is ? 'blue' : 'green'}
				variant="outline"
				isLoading={isCreating || isUpdating}
			>
				{edit.is ? 'Обновить' : 'Создать'}
			</Button>
			{edit.is && (
				<IconButton
					aria-label="cancel"
					colorScheme="blue"
					icon={<Icon as={MdOutlineCancel} />}
					onClick={() => {
						setEdit({ is: false, id: '' });
						clear();
					}}
				/>
			)}
		</ButtonGroup>
	);
};
export default CategoryAction;
