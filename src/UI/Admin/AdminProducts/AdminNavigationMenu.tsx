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
				dispatch({
					type: 'SET_VIEW',
					payload: {
						...state.controlView,
						product: true,
						category: false,
						size: false,
					},
				});
				break;
			case 'Размер':
				dispatch({
					type: 'SET_VIEW',
					payload: {
						...state.controlView,
						product: false,
						category: false,
						size: true,
					},
				});
				break;
			case 'Категория':
				dispatch({
					type: 'SET_VIEW',
					payload: {
						...state.controlView,
						product: false,
						category: true,
						size: false,
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
					icon={<Icon as={IoIosArrowBack} />}
					as={motion.button}
					initial={{ opacity: 0, x: 25 }}
					animate={{ opacity: 1, x: 0 }}
					onClick={() =>
						dispatch({
							type: 'SET_VIEW',
							payload: {
								...state.controlView,
								category: false,
								product: false,
								size: false,
							},
						})
					}
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
				>
					{actionString(stateEdit)} {value}
				</Button>
			))}
		</Stack>
	);
};

export default AdminNavigationMenu;
