import { Button, FormLabel, Select, Stack, Text } from '@chakra-ui/react';
import { useProductDitalsContext } from '~/context/productDitailsContext';
import ProductDitalsAction from './ProductDitalsAction';

const ProductDitalsInfo = () => {
	const { product, dispatch, state } = useProductDitalsContext();
	return (
		<Stack
			w={['100%', '50%']}
			alignItems="center"
			textAlign="center"
			gap={5}
			maxW={[null, 350]}
			px={[5, null]}
		>
			<Text fontSize="2xl">{product.name}</Text>
			<Stack
				direction="row"
				flexWrap="wrap"
				justifyContent="center"
				maxW={300}
			>
				{product.size.map(({ id, value }) => (
					<Button
						border={
							state.size.errorSelect ? '1px solid' : undefined
						}
						borderColor={
							state.size.errorSelect ? 'orange.300' : undefined
						}
						key={id}
						isActive={state.size.id === id}
						onClick={() => {
							dispatch({
								type: 'SIZE',
								payload: state.size.id === id ? '' : id,
							});
						}}
					>
						{value}
					</Button>
				))}
			</Stack>
			<Stack w={['90%', '100%']}>
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
			<Text fontSize="2xl" fontWeight={600}>
				{product.priceHistory[0]?.price} ₽
			</Text>
			<ProductDitalsAction />
			<Text>{product.description}</Text>
		</Stack>
	);
};

export default ProductDitalsInfo;
