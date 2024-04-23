import {
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useCreateSize } from '~/store/useCreateSize';
import { api } from '~/utils/api';

export default function AdminSizeButton() {
	const toast = useToast();
	const ctx = api.useContext();
	const { data: sizes } = api.size.get.useQuery();
	const { mutate: deletSize, isLoading } = api.size.delete.useMutation({
		onSuccess: () => {
			void ctx.size.invalidate();
			toast({
				description: 'Размер успешно удалён',
				status: 'info',
			});
		},
	});
	const [setVal, setEdit, edit] = useCreateSize((state) => [
		state.setValue,
		state.setEdit,
		state.edit,
	]);
	const handlEdit = (id: string, value: string) => {
		setEdit({ id, is: true });
		setVal(value);
	};
	return (
		<Stack
			direction="row"
			flexWrap="wrap"
			justifyContent="center"
			maxW="385px"
			gap={3}
		>
			{sizes?.map(({ id, value }) => (
				<ButtonGroup key={id} isAttached size="sm" variant="outline">
					<Button
						onClick={() => handlEdit(id, value)}
						isActive={edit.id === id}
					>
						{value}
					</Button>
					<IconButton
						isLoading={isLoading}
						aria-label="delet-size"
						icon={<Icon as={MdDelete} />}
						colorScheme="red"
						onClick={() => deletSize({ id })}
					/>
				</ButtonGroup>
			))}
		</Stack>
	);
}
