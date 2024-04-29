import { Button, Stack, useToast } from '@chakra-ui/react';
import { useFaq } from '~/store/useFaq';
import { api } from '~/utils/api';

export default function FAQAction({ onClose }: { onClose: () => void }) {
	const [clear, setError, edit, input, id] = useFaq((state) => [
		state.clear,
		state.setError,
		state.edit.is,
		state.input,
		state.edit.id,
	]);
	const { mutate: create, isLoading: isCreate } = api.faq.create.useMutation({
		onSuccess: ({ message, success }) => {
			void ctx.faq.invalidate();
			toast({
				description: message,
				status: success ? 'success' : 'error',
			});
			clear();
			onClose();
		},
		onError: ({ data, message }) => {
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

	const { mutate: update, isLoading: isUpdate } = api.faq.update.useMutation({
		onSuccess: ({ message, success }) => {
			void ctx.faq.invalidate();
			toast({
				description: message,
				status: success ? 'info' : 'error',
			});
			onClose();
		},
	});
	const ctx = api.useContext();
	const toast = useToast();
	function handlAction() {
		const { content, title } = input;
		if (edit) {
			update({ content, title, id });
			return;
		}
		create({ content, title });
	}
	return (
		<Stack direction="row">
			<Button
				colorScheme="red"
				onClick={() => {
					clear();
					onClose();
				}}
			>
				Отмена
			</Button>
			<Button
				colorScheme="telegram"
				isLoading={isCreate || isUpdate}
				onClick={handlAction}
			>
				{edit ? 'Обновить' : 'Создать'}
			</Button>
		</Stack>
	);
}
