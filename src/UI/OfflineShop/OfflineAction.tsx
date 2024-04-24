import { Button, Stack, useToast } from '@chakra-ui/react';
import { useOfflineShop } from '~/store/useOfflineShop';
import { api } from '~/utils/api';

export default function OfflineAction({ onClose }: { onClose: () => void }) {
	const ctx = api.useContext();
	const toast = useToast();
    const {mutate: deletImg} = api.shop.deletImg.useMutation()
	const { mutate: create, isLoading: isCreating } =
		api.shop.create.useMutation({
			onSuccess: ({ message }) => {
				void ctx.shop.invalidate();
				toast({
					description: message,
					status: 'success',
				});
				clear();
				onClose();
			},
			onError: ({ data, message }) => {
				if (data?.zodError) {
					setErr({ isError: true, path: data.zodError });
					return;
				}
				toast({ description: message, status: 'error' });
			},
		});

	const { mutate: update, isLoading: isUpdating } =
		api.shop.update.useMutation({
			onSuccess: ({ message }) => {
				void ctx.shop.invalidate(),
					toast({
						description: message,
						status: 'success',
					});
				clear();
				onClose();
			},
			onError: ({ data, message }) => {
				if (data?.zodError) {
					setErr({ isError: true, path: data.zodError });
					return;
				}
				toast({ description: message, status: 'error' });
			},
		});

	const [edit, id, input, clear, setErr, image] = useOfflineShop((state) => [
		state.edit.is,
		state.edit.id,
		state.input,
		state.clear,
		state.setError,
		state.image,
	]);
	function handlAction() {
		const { name, phone, work_time, fullAddress } = input;
		if (edit) {
			update({ id, fullAddress, name, phone, image, work_time });
			return;
		}
		create({ image, name, work_time, phone, fullAddress });
	}
    function handlCancel() {
        if(image) {
            deletImg(image)
        }
        clear()
        onClose()
    }
	// TODO NOW HERE
	return (
		<Stack direction='row'>
			<Button
				colorScheme="telegram"
				isLoading={isCreating || isUpdating}
				onClick={handlAction}
			>
				{edit ? 'Обновить' : 'Сохранить'}
			</Button>

			<Button colorScheme="red" onClick={handlCancel}>
				Отмена
			</Button>
		</Stack>
	);
}
