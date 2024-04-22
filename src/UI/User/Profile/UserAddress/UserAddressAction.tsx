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
	const [input, selected, clear, setErr] = useAddress((state) => [
		state.input,
		state.point?.selected,
		state.clear,
		state.setError,
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
				} else {
					toast({
						description: message,
						status: 'error',
					});
				}
			},
		});
	const handlAction = () => {
		const { lastName, firstName, contactPhone: phone } = input;
		create({
			firstName,
			lastName,
			phone,
			point: selected?.addressFullName ?? '',
		});
	};
	return (
		<Stack>
			<Button
				colorScheme="twitter"
				isLoading={isLoadingCreate}
				onClick={handlAction}
			>
				Сохранить
			</Button>
			<Button onClick={() => {}}>Отмена</Button>
		</Stack>
	);
}
