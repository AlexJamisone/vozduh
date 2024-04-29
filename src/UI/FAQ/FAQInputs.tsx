import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { faq } from '~/constants/faq';
import { type FaqInputValue, useFaq } from '~/store/useFaq';

export default function FAQInputs() {
	const [set, input, error, reset] = useFaq((state) => [
		state.setInput,
		state.input,
		state.error,
		state.reset,
	]);
	function handlInput(e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) {
		if (error?.is) {
			reset();
		}
		const { name, value } = e.currentTarget;
		set({ [name]: value } as FaqInputValue);
	}
	return (
		<Stack>
			{faq.map(({ name, label, id, isTextarea, placeholder }) => (
				<FormControl
					key={id}
					isInvalid={
						error?.is &&
						error.path.fieldErrors?.[name] !== undefined
					}
				>
					<FormLabel>{label}</FormLabel>
					<Input
						onInput={handlInput}
						name={name}
						as={isTextarea ? Textarea : undefined}
						type="text"
						placeholder={placeholder}
						value={input[name]}
					/>
					{error?.path.fieldErrors?.[name]?.map((err) => (
						<FormErrorMessage key={err}>{err}</FormErrorMessage>
					))}
				</FormControl>
			))}
		</Stack>
	);
}
