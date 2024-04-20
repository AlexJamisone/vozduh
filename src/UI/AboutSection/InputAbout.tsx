import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { about } from '~/constants/about';
import { AboutInputValue, useAbout } from '~/store/useAbout';

const InputAbout = () => {
	const [input, set, reset, error] = useAbout((state) => [
		state.input,
		state.setInput,
		state.reset,
		state.error,
	]);
	const change = (e: ChangeEvent<HTMLInputElement>) => {
		if (error?.isError) {
			reset();
		}
		const { value, name } = e.target;
		set({ [name]: value } as AboutInputValue);
	};
	return (
		<Stack>
			{about.map(({ label, placeholder, id, name, type, isTextarea }) => (
				<FormControl
					key={id}
					isInvalid={
						error?.isError &&
						error.path.fieldErrors[name] !== undefined
					}
				>
					<FormLabel>{label}</FormLabel>
					<Input
						as={isTextarea ? Textarea : undefined}
						placeholder={placeholder}
						name={name}
						type={type}
						onChange={change}
						value={input[name]}
					/>
					{error?.path.fieldErrors?.[name]?.map((err) => (
						<FormErrorMessage key={err}>{err}</FormErrorMessage>
					))}
				</FormControl>
			))}
		</Stack>
	);
};
export default InputAbout;
