import { Button, FormLabel, Select, Stack, Text } from '@chakra-ui/react';
import { useProductDitalsContext } from '~/context/productDitailsContext';
import ProductDitalsAction from './ProductDitalsAction';

const ProductDitalsInfo = () => {
	const { product, dispatch, state } = useProductDitalsContext();
	return (
		<Stack>
			<Text fontSize="2xl">{product.name}</Text>
			<Stack direction="row">
				{product.size.map(({ id, value }) => (
					<Button
						key={id}
						isActive={state.sizeId === id}
						onClick={() =>
							dispatch({
								type: 'SIZE',
								payload: state.sizeId === id ? '' : id,
							})
						}
					>
						{value}
					</Button>
				))}
			</Stack>
			<Stack>
				{product.additionalServices?.map(
					({ id, additionalServicesOption, title }) => (
						<Stack key={id}>
							<FormLabel>{title}</FormLabel>
							<Select
								placeholder="Стандарт"
								onChange={(e) => {
									const selectedOption =
										additionalServicesOption.find(
											(option) =>
												option.id === e.target.value
										);
									const price = selectedOption
										? selectedOption.price
										: 0;
									dispatch({
										type: 'SERVICE',
										payload: {
											serviceId: id,
											optionId: e.target.value,
											price: Number(price),
										},
									});
								}}
							>
								{additionalServicesOption.map(
									({ id, name, price }) => (
										<option key={id} value={id}>
											{name} {price} ₽
										</option>
									)
								)}
							</Select>
						</Stack>
					)
				)}
			</Stack>
			<Stack>
				<ProductDitalsAction />
			</Stack>
		</Stack>
	);
};

export default ProductDitalsInfo;
