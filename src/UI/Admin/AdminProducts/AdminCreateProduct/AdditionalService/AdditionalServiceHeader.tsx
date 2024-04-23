import { Icon, IconButton, Input, Stack } from '@chakra-ui/react';
import { MdOutlinePlaylistRemove } from 'react-icons/md';
import { useAdditionalService } from '~/store/useAdditionalServise';

export default function AdditionalServiceHeader({
	title,
	id,
}: {
	title: string;
	id: string;
}) {
	const set = useAdditionalService((state) => state.setTitle);
	const remove = useAdditionalService((state) => state.removeService);
	return (
		<Stack direction="row">
			<Input
				value={title}
				onChange={(e) => set(id, e.target.value)}
				placeholder="Заголовок сервиса"
				variant="filled"
				textAlign="center"
			/>
			<IconButton
				aria-label="remove-service"
				icon={<Icon as={MdOutlinePlaylistRemove} />}
				colorScheme="red"
				onClick={() => remove(id)}
			/>
		</Stack>
	);
}
