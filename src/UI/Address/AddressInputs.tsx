import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Textarea,
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router';
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
	const { isSignedIn } = useAuth();
	const router = useRouter();
	const handlInput = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (error?.isError) {
			reset();
		}
		const { name, value } = e.target;
		set({ [name]: value } as AddressInputValue);
	};
	const inputs =
		!isSignedIn && router.pathname === '/new-order'
			? addressInput
			: addressInput.filter((input) => input.name !== 'comment');
	return (
		<Stack>
			{inputs.map(
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
								placeholder={placeholder}
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
		</Stack>
	);
};

export default AddressInputs;
