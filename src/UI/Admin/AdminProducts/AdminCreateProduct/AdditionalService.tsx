import { Button, Icon, IconButton, Input, Stack } from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useProductContext } from '~/context/productContext';

const AdditionalService = () => {
	const { dispatch, state } = useProductContext();
	return (
		<Stack>
			{state.product.serviceAvailability.map(
				({ price, title }, index) => (
					<Stack key={index} direction="row">
						<Input
							type="text"
							placeholder="Придумай название"
							value={title}
							onChange={(e) =>
								dispatch({
									type: 'UPDATE_SERVICE',
									payload: {
										index,
										title: e.target.value,
									},
								})
							}
						/>
						<Input
							type="text"
							placeholder="Введи цену в ₽"
							value={price}
							onChange={(e) =>
								dispatch({
									type: 'UPDATE_SERVICE',
									payload: {
										index,
										price: e.target.value,
									},
								})
							}
						/>
						<IconButton
							aria-label="remove-options"
							icon={<Icon as={AiOutlineDelete} />}
							colorScheme="red"
							onClick={() =>
								dispatch({
									type: 'REMOVE_SERVICE',
									payload: index,
								})
							}
						/>
					</Stack>
				)
			)}
			<Button
				onClick={() =>
					dispatch({
						type: 'ADD_SERVICE',
						payload: {
							id: '',
							price: '',
							title: '',
						},
					})
				}
			>
				Добавть Доп. Опцию
			</Button>
		</Stack>
	);
};

export default AdditionalService;
