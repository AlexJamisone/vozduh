import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Textarea,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { IMaskInput } from 'react-imask';
import { addressInput } from '~/constants/address';
import { AddressInputValue, useAddress } from '~/store/useAddress';

const AddressInputs = () => {
	const [input, error, set, reset] = useAddress((state) => [
		state.input,
		state.error,
		state.setInput,
		state.reset,
	]);
	const handlInput = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (error?.isError) {
			reset();
		}
		const { name, value } = e.target;
		set({ [name]: value } as AddressInputValue);
	};
	return (
		<>
			{addressInput.map(
				({
					name,
					isTextarea,
					label,
					type,
					id,
					placeholder,
					isMask,
				}) => (
					<FormControl
						key={id}
						isInvalid={
							error?.isError &&
							error.path.fieldErrors?.[name] !== undefined
						}
					>
						<FormLabel>{label}</FormLabel>
						{isTextarea ? (
							<Textarea
								onChange={handlInput}
								value={input[name]}
							/>
						) : (
							<Input
								as={isMask ? IMaskInput : undefined}
								mask={isMask ? '+{7}(000)000-00-00' : undefined}
								type={type}
								value={input[name]}
								placeholder={placeholder}
								onChange={handlInput}
								name={name}
							/>
						)}
						{error?.path.fieldErrors?.[name]?.map((err) => (
							<FormErrorMessage key={err}>{err}</FormErrorMessage>
						))}
					</FormControl>
				)
			)}
		</>
	);
};

export default AddressInputs;
