import { Center, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ProductCard from '~/UI/ProductCard';
import { api } from '~/utils/api';

const ProductCategory = () => {
	const { query } = useRouter();
	const { data: products } = api.product.getProductByCategory.useQuery({
		path: query.path as string,
	});

	return (
		<Center pt={200}>
			<Stack justifyContent="center">
				{products?.map((product, index) => (
					<ProductCard
						key={product.id}
						product={product}
						index={index}
						role="USER"
						image={<ProductCard.Image />}
					/>
				))}
			</Stack>
		</Center>
	);
};

export default ProductCategory;
