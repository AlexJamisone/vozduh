import {
	Button,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Stack,
	useToast,
} from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { BiCategory } from 'react-icons/bi';
import NoData from '~/components/NoData';
import { categoryInputs } from '~/constants/categorys';
import { useProductContext } from '~/context/productContext';
import { api } from '~/utils/api';
import ImageUploader from '../AdminCreateProduct/ImageUploader';
import ProductImage from '../AdminCreateProduct/ProductImage';
import CategoryButton from './CategoryButton';

const AdminCategorys = () => {
	const { data: categoys } = api.categorys.get.useQuery();
	const {
		mutate: create,
		error: errorCreate,
		isError: isErrorCreate,
		isLoading: isLoadingCreate,
		reset,
	} = api.categorys.create.useMutation();
	const {
		mutate: update,
		isError: isErrorUpdate,
		error: errorUpdate,
		isLoading: isLoadingUpdate,
	} = api.categorys.update.useMutation();

	const { state, dispatch } = useProductContext();
	const ctx = api.useContext();
	const toast = useToast();
	const handlClick = () => {
		if (state.controlView.editCategory) {
			update(
				{
					id: state.category.id,
					image: state.category.image,
					path: state.category.path,
					title: state.category.title,
				},
				{
					onSuccess: () => {
						void ctx.categorys.invalidate();
						toast({
							description: 'Категория успешно обновленна ✔',
							status: 'info',
							position: 'top-right',
							isClosable: true,
							duration: 2000,
						});
						dispatch({ type: 'CLEAR_CATEGORY' });
						dispatch({
							type: 'SET_VIEW',
							payload: {
								...state.controlView,
								editCategory: false,
							},
						});
					},
				}
			);
		} else {
			create(
				{
					id: state.category.id,
					image: state.category.image,
					path: state.category.path,
					title: state.category.title,
				},
				{
					onSuccess: () => {
						void ctx.categorys.invalidate();
						toast({
							description: `Категория "${state.category.title}" успешно создана! ✔`,
							isClosable: true,
							duration: 2500,
							status: 'success',
							position: 'top-right',
						});
						dispatch({ type: 'CLEAR_CATEGORY' });
					},
				}
			);
		}
	};
	const handlChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		reset();
		switch (name) {
			case 'title':
				dispatch({
					type: 'SET_CATEGORY',
					payload: { ...state.category, title: value },
				});
				break;
			case 'path':
				dispatch({
					type: 'SET_CATEGORY',
					payload: { ...state.category, path: value },
				});
				break;
		}
	};
	const createError = errorCreate?.data?.zodError?.fieldErrors;
	const updateError = errorUpdate?.data?.zodError?.fieldErrors;
	return (
		<Stack>
			<Stack direction="row">
				<Stack w={'50%'}>
					{categoryInputs(state.category).map(
						({ id, label, name, placeholder, value, helper }) => (
							<FormControl
								key={id}
								maxW={350}
								isInvalid={
									(isErrorCreate &&
										createError?.[name]?.[0] !==
											undefined) ||
									(isErrorUpdate &&
										updateError?.[name]?.[0] == undefined)
								}
							>
								<FormLabel>{label}</FormLabel>
								<Input
									value={value}
									placeholder={placeholder}
									name={name}
									onChange={handlChange}
								/>
								<FormHelperText>{helper}</FormHelperText>
								<FormErrorMessage fontWeight={600}>
									{errorCreate?.data?.zodError?.fieldErrors[
										name
									]?.[0] ||
										errorUpdate?.data?.zodError
											?.fieldErrors[name]?.[0]}
								</FormErrorMessage>
							</FormControl>
						)
					)}
				</Stack>
				<Stack
					direction="row"
					flexWrap="wrap"
					w="50%"
					maxW={350}
					justifyContent="center"
					alignItems="center"
				>
					{categoys?.length === 0 ? (
						<NoData
							icon={BiCategory}
							title="Нет доступных категорий"
						/>
					) : (
						categoys?.map((category) => (
							<CategoryButton
								key={category.id}
								category={category}
							/>
						))
					)}
				</Stack>
			</Stack>
			<FormControl
				isInvalid={
					isErrorCreate && createError?.['image'] !== undefined
				}
			>
				<Stack
					_dark={{
						border: '1px dashed',
						borderColor: 'gray.600',
						rounded: 'base',
					}}
				>
					<ImageUploader endpoint="signlUploader" />
				</Stack>
				<FormErrorMessage fontWeight={600}>
					{createError?.['image']}
				</FormErrorMessage>
			</FormControl>
			<Stack alignItems="center" mt={3}>
				{state.category.image.length !== 0 && (
					<ProductImage
						src={state.category.image}
						image={{
							height: 200,
							width: 200,
						}}
					/>
				)}
			</Stack>
			<Button
				onClick={handlClick}
				isLoading={isLoadingCreate || isLoadingUpdate}
			>
				{state.controlView.editCategory ? 'Обновить' : 'Сохранить'}
			</Button>
		</Stack>
	);
};

export default AdminCategorys;
