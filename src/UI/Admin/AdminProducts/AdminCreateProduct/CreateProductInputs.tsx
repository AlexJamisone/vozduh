import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { productCreate } from '~/constants/productCreate';
import {
	useCreateProduct,
	type ProductInputValue,
} from '~/store/useCreateProduct';

const CreateProductInputs = () => {
	const [input, set, error] = useCreateProduct((state) => [
		state.input,
		state.setInputs,
		state.error,
	]);
	function handlInput(e: FormEvent<HTMLInputElement>) {
		const { value, name, type } = e.currentTarget;
		set({
			[name]: type === 'number' ? +value : value,
		} as ProductInputValue);
	}
	return (
		<Stack>
			{productCreate.map(
				({ label, name, placeholder, id, isTextarea, type }) => (
					<FormControl
						key={id}
						isInvalid={
							error?.isError &&
							error.path.fieldErrors?.[name] !== undefined
						}
					>
						<FormLabel>{label}</FormLabel>
						<Input
							name={name}
							type={type}
							value={input[name]}
							as={isTextarea ? Textarea : undefined}
							placeholder={placeholder}
							onInput={handlInput}
						/>
						{error?.path.fieldErrors?.[name]?.map((err) => (
							<FormErrorMessage key={err}>{err}</FormErrorMessage>
						))}
					</FormControl>
				)
			)}
		</Stack>
	);
};

export default CreateProductInputs;
