import { Icon, IconButton, Input, Stack } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import {
	useAdditionalService,
	type AdditionalOption,
} from '~/store/useAdditionalServise';

export default function ServiceOptionStick({
	option,
	id,
}: {
	option: AdditionalOption;
	id: string;
}) {
	const setOption = useAdditionalService((state) => state.setOption);
	const removeOption = useAdditionalService((state) => state.removeOption);
	return (
		<Stack direction="row">
			<Input
				value={option.name}
				placeholder="Название опции"
				onInput={(e) =>
					setOption(
						id,
						option.id,
						e.currentTarget.value,
						option.price
					)
				}
			/>
			<Input
				value={option.price === 0 ? '' : option.price}
				type="number"
				placeholder="Цена опции"
				onInput={(e) =>
					setOption(
						id,
						option.id,
						option.name,
						e.currentTarget.valueAsNumber
					)
				}
			/>
			<IconButton
				onClick={() => removeOption(id, option.id)}
				aria-label="delet-option"
				icon={<Icon as={MdDelete} />}
				colorScheme="red"
				variant="outline"
			/>
		</Stack>
	);
}
