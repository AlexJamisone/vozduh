import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useReducer } from 'react';
import ProductDitails from '~/UI/ProductDitails';
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
	return (
		<Center pt={[100, 200]}>
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
