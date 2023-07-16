import {
	Button,
	Divider,
	Editable,
	EditableInput,
	EditablePreview,
	FormControl,
	FormErrorMessage,
	Icon,
	IconButton,
	Input,
	Stack,
} from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useProductContext } from '~/context/productContext';
import productErrorFilter from '~/helpers/productErrorFilter';

const AdditionalService = () => {
	const { dispatch, state, isErrorProduct, productError, resetProduct } =
		useProductContext();
	const errorTitle =
		isErrorProduct &&
		productError?.fieldErrors.service?.includes(
			'Укажи заголовок доп операции'
		);
	const errorPrice =
		isErrorProduct &&
		productError?.fieldErrors.service?.includes('Установи цену доп опции');
	const errorName =
		isErrorProduct &&
		productError?.fieldErrors.service?.includes('Придумай имя доп опции');
	return (
		<Stack>
			{state.product.serviceAvailability.map(
				({ title, additionalOptions }, serviceIndex) => (
					<Stack key={serviceIndex} justifyContent="center">
						<Stack direction="row">
							<FormControl isInvalid={errorTitle}>
								<Editable
									defaultValue={title ?? ''}
									placeholder="Придумай заголовок"
									w="100%"
									textAlign="center"
									fontSize="2xl"
									border="1px solid"
									rounded="base"
									borderColor="red.300"
								>
									<EditablePreview />
									<EditableInput
										value={title}
										onChange={(e) => {
											resetProduct();
											dispatch({
												type: 'UPDATE_SERVICE',
												payload: {
													title: e.target.value,
													index: serviceIndex,
												},
											});
										}}
									/>
								</Editable>
								<FormErrorMessage justifyContent="center">
									{productErrorFilter(
										'Укажи заголовок доп операции',
										productError
									)}
								</FormErrorMessage>
							</FormControl>
							<IconButton
								aria-label="remove-service"
								icon={<Icon as={AiFillDelete} />}
								colorScheme="red"
								onClick={() =>
									dispatch({
										type: 'REMOVE_SERVICE',
										payload: serviceIndex,
									})
								}
							/>
						</Stack>
						<Stack>
							{additionalOptions.map(
								({ name, price }, optionIndex) => (
									<Stack
										direction="row"
										key={optionIndex + 1}
									>
										<FormControl isInvalid={errorName}>
											<Input
												placeholder="Придумай название опции"
												value={name}
												onChange={(e) => {
													resetProduct();
													dispatch({
														type: 'UPDATE_OPTIONS',
														payload: {
															name: e.target
																.value,
															serviceIndex,
															optionIndex,
														},
													});
												}}
											/>
											<FormErrorMessage>
												{productErrorFilter(
													'Придумай имя доп опции',
													productError
												)}
											</FormErrorMessage>
										</FormControl>
										<FormControl isInvalid={errorPrice}>
											<Input
												placeholder="Цена опции в ₽"
												value={price}
												onChange={(e) => {
													resetProduct();
													dispatch({
														type: 'UPDATE_OPTIONS',
														payload: {
															serviceIndex,
															optionIndex,
															price: e.target
																.value,
														},
													});
												}}
											/>
											<FormErrorMessage>
												{productErrorFilter(
													'Установи цену доп опции',
													productError
												)}
											</FormErrorMessage>
										</FormControl>
										<IconButton
											aria-label="remove-option"
											icon={<Icon as={RxCross2} />}
											colorScheme="red"
											onClick={() =>
												dispatch({
													type: 'REMOVE_OPTIONS',
													payload: {
														optionIndex,
														serviceIndex,
													},
												})
											}
										/>
									</Stack>
								)
							)}
						</Stack>
						<Button
							onClick={() =>
								dispatch({
									type: 'ADD_OPTION',
									payload: {
										serviceIndex,
									},
								})
							}
							colorScheme="green"
						>
							Добавить вариант
						</Button>
						<Divider />
					</Stack>
				)
			)}
			<Button
				onClick={() =>
					dispatch({
						type: 'ADD_SERVICE',
						payload: {
							name: '',
							optionsId: '',
							price: '',
							serviceId: '',
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
