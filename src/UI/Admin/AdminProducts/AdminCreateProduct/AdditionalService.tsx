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
import { useRef } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import productErrorFilter from '~/helpers/productErrorFilter';
import { useCreateProduct } from '~/store/useCreateProduct';

const AdditionalService = () => {
	// TODO: NOW HERE
	const [serviceAvailability] = useCreateProduct((state) => [
		state.serviceAvailability,
	]);
	const inputref = useRef<HTMLInputElement | null>(null);
	return (
		<Stack>
			{serviceAvailability.map(
				({ title, additionalOptions }, serviceIndex) => (
					<Stack key={serviceIndex} justifyContent="center">
						<Stack direction="row">
							<FormControl>
								<Editable
									defaultValue={title ?? ''}
									placeholder="Придумай заголовок"
									w="100%"
									textAlign="center"
									fontSize="2xl"
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
										errorProduct
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
												ref={inputref}
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
													errorProduct
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
													errorProduct
												)}
											</FormErrorMessage>
										</FormControl>
										<IconButton
											aria-label="remove-option"
											icon={<Icon as={RxCross2} />}
											colorScheme="red"
											onClick={() => {
												if (
													additionalOptions.length ===
													1
												) {
													dispatch({
														type: 'REMOVE_SERVICE',
														payload: serviceIndex,
													});
												} else {
													dispatch({
														type: 'REMOVE_OPTIONS',
														payload: {
															optionIndex,
															serviceIndex,
														},
													});
												}
											}}
										/>
									</Stack>
								)
							)}
						</Stack>
						<Button
							onClick={() => {
								dispatch({
									type: 'ADD_OPTION',
									payload: {
										serviceIndex,
									},
								});
							}}
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
