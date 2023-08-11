import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Skeleton,
	Stack,
	useToast,
} from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { size } from '~/constants/size';
import { useProductContext } from '~/context/productContext';
import { api } from '~/utils/api';
import AdminSizeButton from './AdminSizeButton';

const AdminSize = () => {
	const { state, dispatch } = useProductContext();
	const { data: sizes, isLoading } = api.size.get.useQuery();
	const {
		mutate: create,
		isLoading: isLoadingCreate,
		isError: isErrorCreate,
		error: errorCreate,
		reset,
	} = api.size.create.useMutation();
	const {
		mutate: update,
		isLoading: isLoadingUpdate,
		isError: isErrorUpdate,
		error: errorUpdate,
	} = api.size.update.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const handlClick = () => {
		if (state.controlView.editSize) {
			update(
				{
					id: state.size.id,
					value: state.size.value,
				},
				{
					onSuccess: ({ message, success }) => {
						void ctx.size.invalidate();
						dispatch({
							type: 'SET_SIZE',
							payload: {
								id: '',
								value: '',
							},
						});
						toast({
							description: message,
							status: success ? 'info' : 'error',
							duration: 2500,
							isClosable: true,
							position: 'top-right',
						});
					},
				}
			);
		} else {
			create(
				{
					value: state.size.value,
				},
				{
					onSuccess({ message, success }) {
						void ctx.size.invalidate();
						dispatch({
							type: 'SET_SIZE',
							payload: {
								id: '',
								value: '',
							},
						});

						toast({
							description: message,
							status: success ? 'success' : 'error',
							duration: 2500,
							isClosable: true,
							position: 'top-right',
						});
					},
				}
			);
		}
	};
	return (
		<Stack alignItems="center" mt={[2, 10]} gap={5}>
			<Stack>
				{size(state.size.value).map(
					({ id, label, name, placeholder, value }) => (
						<FormControl
							key={id}
							isInvalid={
								(isErrorCreate &&
									errorCreate?.data?.zodError?.fieldErrors[
										'value'
									] !== undefined) ||
								(isErrorUpdate &&
									errorUpdate.data?.zodError?.fieldErrors[
										'value'
									] !== undefined)
							}
						>
							<FormLabel textAlign="center">{label}</FormLabel>
							<Input
								size={['sm', 'md']}
								placeholder={placeholder}
								name={name}
								value={value}
								onChange={(e) => {
									reset();
									dispatch({
										type: 'SET_SIZE',
										payload: {
											...state.size,
											value: e.target.value,
										},
									});
								}}
							/>
							<FormErrorMessage>
								{errorCreate?.data?.zodError?.fieldErrors[
									'value'
								] ||
									errorUpdate?.data?.zodError?.fieldErrors[
										'value'
									]}
							</FormErrorMessage>
						</FormControl>
					)
				)}
			</Stack>
			<Button
				onClick={handlClick}
				isLoading={isLoadingCreate || isLoadingUpdate}
				colorScheme="telegram"
				size={['sm', 'md']}
			>
				{state.controlView.editSize ? 'Обновить' : 'Сохранить'}
			</Button>
			<Skeleton isLoaded={!isLoading}>
				<Stack
					direction="row"
					gap={3}
					justifyContent="center"
					maxW={300}
					flexWrap="wrap"
				>
					<AnimatePresence>
						{sizes?.map((size) => (
							<AdminSizeButton key={size.id} size={size} />
						))}
					</AnimatePresence>
				</Stack>
			</Skeleton>
		</Stack>
	);
};

export default AdminSize;
