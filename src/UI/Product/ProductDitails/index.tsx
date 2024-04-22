import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import ImageSlider from './ImageSlider';
import ProductDitalsInfo from './ProductDitalsInfo';

const ProductDitails = () => {
	const { query } = useRouter();
	const { data: product } = api.product.getSinglProduct.useQuery({
		id: query.id as string,
	});
	if (!product) return null;
	return (
		<Stack
			direction={['column', 'row']}
			justifyContent="center"
			gap={[0, 24]}
			pb={24}
			as={motion.div}
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					duration: 0.5,
				},
			}}
		>
			<ImageSlider images={product.image} />
			<ProductDitalsInfo />
		</Stack>
	);
};

export default ProductDitails;
