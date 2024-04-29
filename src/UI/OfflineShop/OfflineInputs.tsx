import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
} from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { shopInputs } from '~/constants/shop';
import {
	useOfflineShop,
	type OffilineInputValue,
} from '~/store/useOfflineShop';

export default function OfflineInputs() {
	const [input, setInput, err, reset] = useOfflineShop((state) => [
		state.input,
		state.setInputs,
		state.error,
		state.reset,
	]);
	function handlInput(e: FormEvent<HTMLInputElement>) {
		if (err?.isError) {
			reset();
		}
		const { value, name } = e.currentTarget;
		setInput({ [name]: value } as OffilineInputValue);
	}
	return (
		<Stack>
			{shopInputs.map(({ id, name, label, placeholder }) => (
				<FormControl
					key={id}
					isInvalid={
						err?.isError &&
						err.path.fieldErrors?.[name] !== undefined
					}
				>
					<FormLabel>{label}</FormLabel>
					<Input
						name={name}
						type="text"
						placeholder={placeholder}
						onInput={handlInput}
						value={input[name]}
					/>
					{err?.path.fieldErrors?.[name]?.map((err) => (
						<FormErrorMessage key={err}>{err}</FormErrorMessage>
					))}
				</FormControl>
			))}
		</Stack>
	);
}
