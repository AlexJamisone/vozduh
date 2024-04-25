import { Button, FormLabel, Select, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useProductDitails, type Service } from '~/store/useProductDitails';
import { api } from '~/utils/api';
import ProductDitalsAction from './ProductDitalsAction';

const ProductDitalsInfo = () => {
	const { query } = useRouter();
	const { data: product } = api.product.getSinglProduct.useQuery({
		id: query.id as string,
	});
	const [size, setSize, setService] = useProductDitails((state) => [
		state.size,
		state.setSize,
		state.setService,
	]);
	if (!product) return null;
	function handlService(service: Service) {
		setService(service);
	}
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
					<Button key={id} onClick={() => setSize(value)}>
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
									const option = e.target.value.split(',');
									const optionId = option[0] ?? '';
									const price = Number(option[2] ?? 0);
									const optionTitle = option[1] ?? '';
									handlService({
										title,
										serviceId: id,
										optionId,
										price,
										optionTitle,
									});
								}}
							>
								{additionalServicesOption.map(
									({ id, name, price }) => (
										<option
											key={id}
											value={`${id},${name},${price}`}
										>
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
					size,
				}}
			/>
			<Stack>
				<Text whiteSpace="pre-wrap">{product.description}</Text>
			</Stack>
		</Stack>
	);
};

export default ProductDitalsInfo;
