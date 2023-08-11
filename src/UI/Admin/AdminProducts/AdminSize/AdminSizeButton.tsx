import {
	Button,
	ButtonGroup,
	Icon,
	IconButton,
	useToast,
} from '@chakra-ui/react';
import type { Size } from '@prisma/client';
import { motion } from 'framer-motion';
import { AiOutlineDelete } from 'react-icons/ai';
import { useProductContext } from '~/context/productContext';
import { api } from '~/utils/api';

type Props = {
	size: Size;
};

const AdminSizeButton = ({ size }: Props) => {
	const { dispatch, state } = useProductContext();
	const { mutate: deletSize, isLoading } = api.size.delete.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const { id, value } = size;
	return (
		<ButtonGroup
			isAttached
			as={motion.div}
			exit={{
				opacity: 0,
				transition: {
					type: 'spring',
					duration: 0.5,
				},
			}}
			layout
		>
			<Button
				variant="outline"
				size={['md']}
				isActive={state.size.id === id}
				onClick={() => {
					dispatch({
						type: 'SET_SIZE',
						payload: {
							id: state.size.id === id ? '' : id,
							value: state.size.value === value ? '' : value,
						},
					});
					dispatch({
						type: 'SET_VIEW',
						payload: {
							...state.controlView,
							editSize: state.size.id === id ? false : true,
						},
					});
				}}
			>
				{value}
			</Button>
			<IconButton
				isLoading={isLoading}
				onClick={() =>
					deletSize(
						{ id },
						{
							onSuccess: () => {
								void ctx.size.invalidate();
								toast({
									description: `Размер ${value} успешно удалён`,
									isClosable: true,
									duration: 2500,
									position: 'top-right',
									status: 'success',
								});
							},
						}
					)
				}
				colorScheme="red"
				aria-label="remove"
				size={['md']}
				icon={<Icon as={AiOutlineDelete} />}
			/>
		</ButtonGroup>
	);
};

export default AdminSizeButton;
