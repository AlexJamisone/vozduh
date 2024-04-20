import { Button, Stack, useToast } from '@chakra-ui/react';
import { useAbout } from '~/store/useAbout';
import { api } from '~/utils/api';

const AddressAction = () => {
	const [edit, input, clear, setEdit] = useAbout((state) => [
		state.edit,
		state.input,
		state.clear,
		state.setEdit,
	]);
	const { mutate: createOrUpdate, isLoading } =
		api.about.createOrUpdate.useMutation({
			onSuccess: ({ message }) => {
				void ctx.about.invalidate();
				toast({
					description: message,
					status: 'success',
				});
				clear();
			},
		});
	const ctx = api.useContext();
	const toast = useToast();
	const handlCreate = () => {
		const { title, content } = input;
		const { id } = edit;
		createOrUpdate({ id, content, title });
	};
	const handleCancel = () => {
		setEdit({ is: false, id: '' });
		clear();
	};
	return (
		<Stack>
			<Button isLoading={isLoading} onClick={handlCreate}>
				Сохранить
			</Button>
			<Button onClick={handleCancel}>Отмена</Button>
		</Stack>
	);
};
export default AddressAction;
