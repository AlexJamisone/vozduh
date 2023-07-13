import {
	Button,
	FormControl,
	FormErrorMessage,
	Icon,
	IconButton,
	Input,
	Stack,
} from '@chakra-ui/react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useProductContext } from '~/context/productContext';

const AdditionalService = () => {
	const { dispatch, state, isErrorProduct, productError, resetProduct } =
		useProductContext();
	const errorTitle =
		isErrorProduct &&
		productError?.fieldErrors.service?.includes(
			'Укажи название доп операции'
		);
	const errorPrice =
		isErrorProduct &&
		productError?.fieldErrors.service?.includes(
			'Укажи цену за доп услугу, либо поставь 0'
		);
	return (
		<Stack>
			{state.product.serviceAvailability.map(
				({ price, title }, index) => (
					<Stack key={index} direction="row">
						<FormControl isInvalid={errorTitle}>
							<Input
								type="text"
								placeholder="Придумай название"
								value={title}
								onChange={(e) => {
									resetProduct();
									dispatch({
										type: 'UPDATE_SERVICE',
										payload: {
											index,
											title: e.target.value,
										},
									});
								}}
							/>
							<FormErrorMessage>
								{productError?.fieldErrors.service?.filter(
									(service) =>
										service.includes(
											'Укажи название доп операции'
										)
								)}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errorPrice}>
							<Input
								type="text"
								placeholder="Введи цену в ₽"
								value={price}
								onChange={(e) => {
									resetProduct();
									dispatch({
										type: 'UPDATE_SERVICE',
										payload: {
											index,
											price: e.target.value,
										},
									});
								}}
							/>
							<FormErrorMessage>
								{productError?.fieldErrors.service?.filter(
									(service) =>
										service.includes(
											'Укажи цену за доп услугу, либо поставь 0'
										)
								)}
							</FormErrorMessage>
						</FormControl>
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
