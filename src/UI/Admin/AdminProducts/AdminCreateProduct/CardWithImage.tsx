import { Card, CardBody, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useProductContext } from '~/context/productContext';
import ProductImage from './ProductImage';

const CardWithImage = () => {
	const { state } = useProductContext();
	return (
		<>
			{state.product.image.length !== 0 && (
				<Card
					as={motion.div}
					initial={{ opacity: 0, y: 25 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<CardBody
						as={Stack}
						direction="row"
						flexWrap="wrap"
						justifyContent="center"
						gap={5}
					>
						{state.product.image.map((src) => (
							<ProductImage key={src} src={src} />
						))}
					</CardBody>
				</Card>
			)}
		</>
	);
};

export default CardWithImage;
