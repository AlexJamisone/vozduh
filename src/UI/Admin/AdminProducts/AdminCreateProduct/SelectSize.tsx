import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Stack,
} from '@chakra-ui/react';
import { useProductContext } from '~/context/productContext';
import { api } from '~/utils/api';
import SizeButton from './SizeButton';

const SelectSize = () => {
	const { data: sizes } = api.size.get.useQuery();
	const { isErrorProduct, productError } = useProductContext();
	return (
		<FormControl
			isInvalid={
				isErrorProduct && productError?.fieldErrors.size !== undefined
			}
		>
			<FormLabel>Выбери размеры</FormLabel>
			<Stack direction="row" justifyContent="center" flexWrap="wrap">
				{sizes?.map((size) => (
					<SizeButton key={size.id} size={size} />
				))}
			</Stack>
			<FormErrorMessage display="flex" justifyContent="center">
				{productError?.fieldErrors.size}
			</FormErrorMessage>
		</FormControl>
	);
};

export default SelectSize;
