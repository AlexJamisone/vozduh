import { Card, CardBody, CardHeader, Stack, Tag, Text } from '@chakra-ui/react';
import type { Product, ProductPriceHistory, Role } from '@prisma/client';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import ProductCardContext from '~/context/productCardContext';
import ProductCardImg from './ProductCardImg';

type ProductCardProps = {
	product: Product & {
		priceHistory: ProductPriceHistory[];
	};
	role?: Role;
	image?: ReactNode;
	index: number;
};

const ProductCard = ({ product, role, index, image }: ProductCardProps) => {
	return (
		<Card
			size={['sm', null, null, 'md']}
			fontWeight={600}
			textAlign="center"
			as={motion.div}
			layout
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					type: 'spring',
					delay: 0.2 * index,
				},
			}}
		>
			<ProductCardContext.Provider
				value={{
					product,
				}}
			>
				<CardHeader position="relative">{image}</CardHeader>
				<CardBody>
					<Stack gap={5} alignItems="center">
						<Text>{product.name}</Text>
						{role === 'ADMIN' && <Tag>{product.categoryTitle}</Tag>}
						<Text>{product.priceHistory[0]?.price} ₽</Text>
					</Stack>
				</CardBody>
			</ProductCardContext.Provider>
		</Card>
	);
};

ProductCard.Image = ProductCardImg;

export default ProductCard;
