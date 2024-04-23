import { Stack, TabPanel } from '@chakra-ui/react';
import ProductCard from '~/UI/Product/ProductCard';
import { api } from '~/utils/api';

export default function AdminProduc() {
	const { data: products } = api.product.getForAdmin.useQuery();
	return (
		<TabPanel>
			<Stack direction="row" flexWrap="wrap">
				{products?.map((product, idx) => (
					<ProductCard
						key={product.id}
						product={product}
						index={idx}
						role="ADMIN"
					/>
				))}
			</Stack>
		</TabPanel>
	);
}
