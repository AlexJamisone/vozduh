import { Button, FormLabel, Select, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import ProductDitalsAction from './ProductDitalsAction';

const ProductDitalsInfo = () => {
	const { query } = useRouter();
	const { data: product } = api.product.getSinglProduct.useQuery({
		id: query.id as string,
	});
	if (!product) return null;
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
					<Button key={id} onClick={() => {}}>
						{value}
					</Button>
				))}
			</Stack>
			<Stack w={['90%', '100%']}>
				{product.additionalServices?.map(
					({ id, additionalServicesOption, title }, index) => (
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
									const name = selectedOption
										? selectedOption.name
										: '';
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
				{product.price} ₽
			</Text>
			<ProductDitalsAction
				item={{
					id: product.id,
					img: product.image[0] ?? '',
					price: product.price,
					name: product.name,
					size: '', // TODO real value
				}}
			/>
			<Stack>
				<Text>{product.description}</Text>
			</Stack>
		</Stack>
	);
};

export default ProductDitalsInfo;
