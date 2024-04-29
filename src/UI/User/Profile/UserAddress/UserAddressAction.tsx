import { Button, Stack, useToast } from '@chakra-ui/react';
import { useAddress } from '~/store/useAddress';
import { api } from '~/utils/api';

export default function UserAddressAction({
	onClose,
}: {
	onClose: () => void;
}) {
	const ctx = api.useContext();
	const toast = useToast();
	const [input, selected, clear, setErr, isSelected] = useAddress((state) => [
		state.input,
		state.point?.selected,
		state.clear,
		state.setError,
		state.controller.isSelected,
	]);
	const { mutate: create, isLoading: isLoadingCreate } =
		api.address.create.useMutation({
			onSuccess: ({ message }) => {
				void ctx.address.invalidate();
				toast({
					description: message,
					status: 'success',
				});
				clear();
				onClose();
			},
			onError: ({ message, data }) => {
				if (data?.zodError) {
					setErr({ isError: true, path: data.zodError });
					return;
				}
				toast({
					description: message,
					status: 'error',
				});
			},
		});
	const handlAction = () => {
		if (!isSelected) {
			toast({ description: 'Потверди пункт выдачи', status: 'warning' });
			return;
		}
		const { lastName, firstName, contactPhone } = input;
		create({
			firstName,
			lastName,
			contactPhone,
			point: selected?.addressFullName ?? '',
		});
	};
	return (
		<Stack direction="row">
			<Button
				colorScheme="twitter"
				isLoading={isLoadingCreate}
				onClick={handlAction}
			>
				Сохранить
			</Button>
			<Button onClick={onClose}>Отмена</Button>
		</Stack>
	);
}
