import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ProductCard from '~/UI/Product/ProductCard';
import AnimataedLayout from '~/components/AnumationLayout';
import { api } from '~/utils/api';

const ProductCategory = () => {
	const { query } = useRouter();
	const { data: products } = api.product.getProductByCategory.useQuery({
		path: query.path as string,
	});

	return (
		<AnimataedLayout>
			<Stack
				justifyContent="center"
				direction="row"
				flexWrap="wrap"
				gap={10}
			>
				{products?.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						role="USER"
					/>
				))}
			</Stack>
		</AnimataedLayout>
	);
};

export default ProductCategory;
