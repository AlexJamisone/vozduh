import { FormLabel, Stack } from '@chakra-ui/react';
import { api } from '~/utils/api';
import SizeButton from './SizeButton';

const SelectSize = () => {
	const { data: sizes } = api.size.get.useQuery();
	if (!sizes) return null;
	return (
		<>
			<FormLabel>Выбери размеры</FormLabel>
			<Stack direction="row">
				{sizes.map((size) => (
					<SizeButton key={size.id} size={size} />
				))}
			</Stack>
		</>
	);
};

export default SelectSize;
