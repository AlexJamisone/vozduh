import {
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	useToast,
} from '@chakra-ui/react';
import type { Category } from '@prisma/client';
import { motion } from 'framer-motion';
import { AiOutlineDelete } from 'react-icons/ai';
import { useProductContext } from '~/context/productContext';
import { api } from '~/utils/api';

type CategoryButtonProps = {
	category: Category;
};

const CategoryButton = ({ category }: CategoryButtonProps) => {
	const { dispatch, state } = useProductContext();
	const { mutate: deleteCategory, isLoading: isLoadedDelet } =
		api.categorys.delete.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const { id, image, path, title } = category;
	return (
		<ButtonGroup variant="outline" isAttached as={motion.div} layout>
			<Button
				isActive={state.category.id === id}
				onClick={() => {
					dispatch({
						type: 'SET_CATEGORY',
						payload: {
							id: state.category.id === id ? '' : id,
							title,
							image,
							path,
						},
					});
					dispatch({
						type: 'SET_VIEW',
						payload: {
							...state.controlView,
							editCategory:
								state.category.id === id ? false : true,
						},
					});
					if (state.category.id === id) {
						dispatch({ type: 'CLEAR_CATEGORY' });
					}
				}}
			>
				{title}
			</Button>
			<IconButton
				isLoading={isLoadedDelet}
				colorScheme="red"
				aria-label="remove"
				icon={<Icon as={AiOutlineDelete} />}
				onClick={() =>
					deleteCategory(
						{
							id,
							image,
						},
						{
							onSuccess: () => {
								void ctx.categorys.invalidate();
								toast({
									description: `Категория ${title} успешно удалена`,
									isClosable: true,
									position: 'top-right',
									status: 'loading',
								});
							},
							onError: (error) => {
								toast({
									description: `${error.message}`,
									status: 'error',
									isClosable: true,
									duration: 2000,
								});
							},
						}
					)
				}
			/>
		</ButtonGroup>
	);
};

export default CategoryButton;
