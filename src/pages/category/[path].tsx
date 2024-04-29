import { Center, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ProductCard from '~/UI/Product/ProductCard';
import { api } from '~/utils/api';

const ProductCategory = () => {
	const { query } = useRouter();
	const { data: products } = api.product.getProductByCategory.useQuery({
		path: query.path as string,
	});

	return (
		<Center pt={200}>
			<Stack justifyContent="center" flexWrap='wrap'>
				{products?.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						role="USER"
					/>
				))}
			</Stack>
		</Center>
	);
};

export default ProductCategory;
