import { Stack, TabPanel } from '@chakra-ui/react';
import ProductCard from '~/UI/Product/ProductCard';
import { api } from '~/utils/api';

export default function AdminProduc() {
	const { data: products } = api.product.getForAdmin.useQuery();
	return (
		<TabPanel>
			<Stack
				direction="row"
				flexWrap="wrap"
				px={[5, 10]}
				justifyContent="center"
				alignItems="center"
				gap={5}
			>
				{products?.map((product) => (
					<ProductCard
						key={product.id}
						product={product}
						role="ADMIN"
					/>
				))}
			</Stack>
		</TabPanel>
	);
}
