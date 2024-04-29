import { Center } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductDitails from '~/UI/Product/ProductDitails';
import { api } from '~/utils/api';

const ProductDitailsPage = () => {
	const { query } = useRouter();
	const { data: product } = api.product.getSinglProduct.useQuery({
		id: query.id as string,
	});
	if (!product) return null;
	return (
		<Center pt={[100, 200]}>
			<Head>
				<title>{product.name}</title>
				<meta name="description" content={''} />
				<meta
					name="keywords"
					content="украшения из серебра, серебряные украшения, ювелирные изделия, серебро, украшения ручной работы, подарки из серебра, воздух, vozduh, кольца из серебра, серьги из серебра, ожерелья из серебра, браслеты из серебра"
				/>
				<meta property="og:title" content={product.name} />
				<meta property="og:description" content={''} />
				<meta
					property="og:image"
					content={`https://utfs.io/f/${product.image[0] as string}`}
				/>
				<meta
					property="og:url"
					content={`https://vozduh-kappa.vercel.app/product/${product.id}`}
				/>
				<meta property="twitter:title" content={product.name} />
				<meta property="twitter:description" content={''} />
				<meta
					property="twitter:image"
					content={`https://utfs.io/f/${product.image[0] as string}`}
				/>
				<meta
					property="twitter:url"
					content={`https://vozduh-kappa.vercel.app/product/${product.id}`}
				/>
			</Head>
			<ProductDitails />
		</Center>
	);
};

export default ProductDitailsPage;
