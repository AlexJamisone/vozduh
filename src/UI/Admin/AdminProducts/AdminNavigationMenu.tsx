import { Button, Icon, IconButton, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { RiAddFill } from 'react-icons/ri';
import { productControllButton } from '~/constants/productControlButton';
import { useProductContext } from '~/context/productContext';
import { actionString } from '~/helpers/actionString';

const AdminNavigationMenu = () => {
	const { dispatch, state } = useProductContext();
	const handlControl = (value: string) => {
		switch (value) {
			case 'Товар':
				dispatch({ type: 'CLEAR' });
				dispatch({
					type: 'SET_VIEW',
					payload: {
						product: true,
						category: false,
						size: false,
						editCategory: false,
						editProduct: false,
						editSize: false,
					},
				});
				break;
			case 'Размер':
				dispatch({ type: 'CLEAR' });
				dispatch({
					type: 'SET_VIEW',
					payload: {
						product: false,
						category: false,
						size: true,
						editCategory: false,
						editProduct: false,
						editSize: false,
					},
				});
				break;
			case 'Категорию':
				dispatch({ type: 'CLEAR' });
				dispatch({
					type: 'SET_VIEW',
					payload: {
						product: false,
						category: true,
						size: false,
						editCategory: false,
						editProduct: false,
						editSize: false,
					},
				});
		}
	};

	return (
		<Stack
			direction={['column-reverse', 'row']}
			as={motion.div}
			layout
			w={['100%', null]}
			px={5}
		>
			{(state.controlView.category ||
				state.controlView.product ||
				state.controlView.size) && (
				<IconButton
					aria-label="back"
					size={['sm', 'md']}
					icon={<Icon as={IoIosArrowBack} />}
					as={motion.button}
					initial={{ opacity: 0, x: 25 }}
					animate={{ opacity: 1, x: 0 }}
					onClick={() => {
						dispatch({
							type: 'SET_VIEW',
							payload: {
								editCategory: false,
								editProduct: false,
								editSize: false,
								category: false,
								product: false,
								size: false,
							},
						});
						dispatch({ type: 'CLEAR' });
					}}
				/>
			)}
			{productControllButton({
				stateView: [
					state.controlView.product,
					state.controlView.size,
					state.controlView.category,
				],
				stateEdit: [
					state.controlView.editProduct,
					state.controlView.editSize,
					state.controlView.editCategory,
				],
			}).map(({ id, value, stateView, stateEdit }) => (
				<Button
					key={id}
					leftIcon={<Icon as={RiAddFill} boxSize={6} />}
					variant="outline"
					isActive={stateView}
					onClick={() => handlControl(value)}
					size={['sm', 'md']}
				>
					{actionString(stateEdit)} {value}
				</Button>
			))}
		</Stack>
	);
};

export default AdminNavigationMenu;
