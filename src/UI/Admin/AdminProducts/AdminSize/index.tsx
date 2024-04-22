import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	TabPanel,
	useToast,
} from '@chakra-ui/react';
import { FormEvent, useRef } from 'react';
import { useCreateSize } from '~/store/useCreateSize';
import { api } from '~/utils/api';
import AdminSizeButton from './AdminSizeButton';

export default function AdminSize() {
	const [edit, value, setVal, clear, reset, error, setErr, id] =
		useCreateSize((state) => [
			state.edit.is,
			state.value,
			state.setValue,
			state.clear,
			state.reset,
			state.error,
			state.setError,
			state.edit.id,
		]);
	const inputRef = useRef<HTMLInputElement>(null);
	const ctx = api.useContext();
	const toast = useToast();
	const { mutate: create, isLoading: isCreating } =
		api.size.create.useMutation({
			onSuccess: ({ message }) => {
				void ctx.size.invalidate();
				toast({
					description: message,
					status: 'success',
				});
				clear();
				if (inputRef.current) {
					inputRef.current.focus();
				}
			},
			onError: ({ data, message }) => {
				if (data?.zodError) {
					setErr({ is: true, path: data.zodError });
				} else {
					toast({
						description: message,
						status: 'error',
					});
				}
			},
		});
	const { mutate: update, isLoading: isUpdating } =
		api.size.update.useMutation({
			onSuccess: ({ message }) => {
				void ctx.size.invalidate();
				toast({
					description: message,
					status: 'success',
				});
				clear();
			},
			onError: ({ data, message }) => {
				if (data?.zodError) {
					setErr({ is: true, path: data.zodError });
				} else {
					toast({
						description: message,
						status: 'error',
					});
				}
			},
		});
	const handlValue = (e: FormEvent<HTMLInputElement>) => {
		if (error?.is) {
			reset();
		}
		const { value } = e.currentTarget;
		setVal(value);
	};
	const handlAction = () => {
		if (edit) {
			update({ value, id });
			return;
		}
		create({ value });
	};
	return (
		<TabPanel>
			<Stack>
				<FormControl
					isInvalid={
						error?.is && error.path.fieldErrors?.value !== undefined
					}
				>
					<FormLabel>Размер</FormLabel>
					<Input
						value={value}
						onInput={handlValue}
						ref={inputRef}
						placeholder="Придумай размер"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handlAction();
							}
						}}
					/>
					{error?.path.fieldErrors.value?.map((err) => (
						<FormErrorMessage key={err}>{err}</FormErrorMessage>
					))}
				</FormControl>
				<AdminSizeButton />
				<Button
					isLoading={isCreating || isUpdating}
					onClick={handlAction}
					variant="outline"
					colorScheme={edit ? 'blue' : 'green'}
				>
					{edit ? 'Обновить' : 'Создать'}
				</Button>
			</Stack>
		</TabPanel>
	);
}
