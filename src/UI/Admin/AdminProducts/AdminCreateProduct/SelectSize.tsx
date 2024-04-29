import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Stack,
} from '@chakra-ui/react';
import { useCreateProduct } from '~/store/useCreateProduct';
import { api } from '~/utils/api';
import SizeButton from './SizeButton';

const SelectSize = () => {
	const { data: sizes } = api.size.get.useQuery();
	const error = useCreateProduct((state) => state.error);
	return (
		<FormControl
			isInvalid={
				error?.isError && error?.path.fieldErrors?.size !== undefined
			}
		>
			<FormLabel>Выбери размеры</FormLabel>
			<Stack direction="row" justifyContent="center" flexWrap="wrap">
				{sizes?.map((size) => (
					<SizeButton key={size.id} value={size.value} />
				))}
			</Stack>
			{error?.path.fieldErrors.size?.map((err) => (
				<FormErrorMessage key={err}>{err}</FormErrorMessage>
			))}
		</FormControl>
	);
};

export default SelectSize;
