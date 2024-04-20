import {
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Stack,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { categoryInputs } from '~/constants/categorys';
import {
	CategoryInputValue,
	useCreateCategory,
} from '~/store/useCreateCategory';

const CategoryInput = () => {
	const [input, set, error, reset] = useCreateCategory((state) => [
		state.input,
		state.setInputs,
		state.error,
		state.reset,
	]);
	const change = (e: ChangeEvent<HTMLInputElement>) => {
		if (error?.is) {
			reset();
		}
		const { name, value } = e.target;
		set({ [name]: value } as CategoryInputValue);
	};
	return (
		<Stack>
			{categoryInputs.map(
				({ type, id, placeholder, name, label, helper }) => (
					<FormControl
						key={id}
						isInvalid={
							error?.is &&
							error.path.fieldErrors?.[name] !== undefined
						}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							type={type}
							placeholder={placeholder}
							name={name}
							onChange={change}
							value={input[name]}
						/>
						{helper && <FormHelperText>{helper}</FormHelperText>}
						{error?.path.fieldErrors?.[name]?.map((err) => (
							<FormErrorMessage key={err}>{err}</FormErrorMessage>
						))}
					</FormControl>
				)
			)}
		</Stack>
	);
};
export default CategoryInput;
