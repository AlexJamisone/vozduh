import { Center } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useReducer } from 'react';
import ProductDitails from '~/UI/Product/ProductDitails';
import ProductDitalsContext from '~/context/productDitailsContext';
import {
	initial,
	productDitailsReducer,
} from '~/reducer/productDirailsReducer';
import { api } from '~/utils/api';

const ProductDitailsPage = () => {
	const { query } = useRouter();
	const { data: product } = api.product.getSinglProduct.useQuery({
		id: query.id as string,
	});
	const [state, dispatch] = useReducer(productDitailsReducer, initial);
	if (!product) return null;
	const description = product.description.join(' ');
	return (
		<Center pt={[100, 200]}>
			<Head>
				<title>{product.name}</title>
				<meta name="description" content={description} />
				<meta
					name="keywords"
					content="украшения из серебра, серебряные украшения, ювелирные изделия, серебро, украшения ручной работы, подарки из серебра, воздух, vozduh, кольца из серебра, серьги из серебра, ожерелья из серебра, браслеты из серебра"
				/>
				<meta property="og:title" content={product.name} />
				<meta property="og:description" content={description} />
				<meta
					property="og:image"
					content={`https://utfs.io/f/${product.image[0] as string}`}
				/>
				<meta
					property="og:url"
					content={`https://vozduh-kappa.vercel.app/product/${product.id}`}
				/>
				<meta property="twitter:title" content={product.name} />
				<meta property="twitter:description" content={description} />
				<meta
					property="twitter:image"
					content={`https://utfs.io/f/${product.image[0] as string}`}
				/>
				<meta
					property="twitter:url"
					content={`https://vozduh-kappa.vercel.app/product/${product.id}`}
				/>
			</Head>
			<ProductDitalsContext.Provider value={{ product, dispatch, state }}>
				<ProductDitails
					info={<ProductDitails.Info />}
					photo={<ProductDitails.Photo />}
				/>
			</ProductDitalsContext.Provider>
		</Center>
	);
};

export default ProductDitailsPage;
