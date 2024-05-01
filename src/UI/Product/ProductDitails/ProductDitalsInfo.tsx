import { Stack, Text, VStack } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useProductDitails } from '~/store/useProductDitails';
import { api } from '~/utils/api';
import ProducService from './ProducService';
import ProductDitailsSizeBtn from './ProductDitailsSizeBtn';
import ProductDitalsAction from './ProductDitalsAction';

const ProductDitalsInfo = () => {
	const { query } = useRouter();
	const { data: product } = api.product.getSinglProduct.useQuery({
		id: query.id as string,
	});
	const warn = useProductDitails((state) => state.warn);
	if (!product) return null;
	return (
		<Stack
			alignItems="center"
			textAlign="center"
			px={[5, null]}
			width={['100%', 'fit-content']}
		>
			<Text fontSize="4xl" as="h1">
				{product.name}
			</Text>
			<VStack>
				<Stack
					direction="row"
					flexWrap="wrap"
					justifyContent="center"
					maxW={300}
				>
					{product.size.map(({ id, value }) => (
						<ProductDitailsSizeBtn value={value} key={id} />
					))}
				</Stack>
				<AnimatePresence>
					{warn && (
						<Text
							as={motion.p}
							initial={{ opacity: 0, y: 50 }}
							animate={{
								opacity: 1,
								y: 0,
								transition: {
									type: 'spring',
									mass: 0.2,
									stiffness: 150,
									duration: 0.4,
								},
							}}
							fontSize="sm"
							textColor="orange.400"
							exit={{
								opacity: 0,
								transition: { duration: 0.3, stiffness: 150 },
							}}
						>
							Выбери размер
						</Text>
					)}
				</AnimatePresence>
			</VStack>
			<Stack w={['90%', '100%']}>
				{product.additionalServices?.map((service) => (
					<ProducService key={service.id} service={service} />
				))}
			</Stack>
			<Text fontSize="2xl" fontWeight={600}>
				{product.price} ₽
			</Text>
			<ProductDitalsAction
				item={{
					id: product.id,
					img: product.image[0] ?? '',
					price: product.price,
					name: product.name,
				}}
			/>
			<Stack>
				<Text variant="description">{product.description}</Text>
			</Stack>
		</Stack>
	);
};

export default ProductDitalsInfo;
