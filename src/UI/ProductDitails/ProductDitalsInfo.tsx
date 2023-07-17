import { Button, FormLabel, Select, Stack, Text } from '@chakra-ui/react';
import { useProductDitalsContext } from '~/context/productDitailsContext';
import ProductDitalsAction from './ProductDitalsAction';

const ProductDitalsInfo = () => {
	const { product } = useProductDitalsContext();

	return (
		<Stack>
			<Text fontSize="2xl">{product.name}</Text>
			<Stack direction="row">
				{product.size.map(({ id, value }) => (
					<Button key={id}>{value}</Button>
				))}
			</Stack>
			<Stack>
				{product.additionalServices?.map(
					({ id, additionalServicesOption, title }) => (
						<Stack key={id}>
							<FormLabel>{title}</FormLabel>
							<Select placeholder="Стандарт">
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
