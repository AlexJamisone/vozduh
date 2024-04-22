import {
	Button,
	Divider,
	Editable,
	EditableInput,
	EditablePreview,
	FormControl,
	Icon,
	IconButton,
	Input,
	Stack,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useCreateProduct } from '~/store/useCreateProduct';

const AdditionalService = () => {
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
										onChange={(e) => {}}
									/>
								</Editable>
							</FormControl>
							<IconButton
								aria-label="remove-service"
								icon={<Icon as={AiFillDelete} />}
								colorScheme="red"
								onClick={() => {}}
							/>
						</Stack>
						<Stack>
							{additionalOptions.map(
								({ name, price }, optionIndex) => (
									<Stack
										direction="row"
										key={optionIndex + 1}
									>
										<FormControl>
											<Input
												placeholder="Придумай название опции"
												value={name}
												ref={inputref}
												onChange={(e) => {}}
											/>
										</FormControl>
										<FormControl>
											<Input
												placeholder="Цена опции в ₽"
												value={price}
												onChange={(e) => {}}
											/>
										</FormControl>
										<IconButton
											aria-label="remove-option"
											icon={<Icon as={RxCross2} />}
											colorScheme="red"
											onClick={() => {}}
										/>
									</Stack>
								)
							)}
						</Stack>
						<Button onClick={() => {}} colorScheme="green">
							Добавить вариант
						</Button>
						<Divider />
					</Stack>
				)
			)}
			<Button onClick={() => {}}>Добавть Доп. Опцию</Button>
		</Stack>
	);
};

export default AdditionalService;
