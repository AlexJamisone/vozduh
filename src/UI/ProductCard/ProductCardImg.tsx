import { Image } from '@chakra-ui/next-js';
import { Skeleton, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProductCardContext } from '~/context/productCardContext';

const ProductCardImg = () => {
	const { product } = useProductCardContext();
	const [isLoadedImg, setIsLoadedImg] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	return (
		<Stack w={260} h={270} position="relative">
			{product.image.map((src, index) => (
				<Skeleton
					position="absolute"
					key={src}
					isLoaded={isLoadedImg}
					onMouseEnter={() =>
						setCurrentImageIndex(
							(prevIndex) =>
								(prevIndex + 1) % product.image.length
						)
					}
					onMouseLeave={() =>
						setCurrentImageIndex(
							(prevIndex) =>
								(prevIndex - 1) % product.image.length
						)
					}
					as={motion.div}
					initial={{ opacity: index === currentImageIndex ? 1 : 0 }}
					animate={{
						opacity: index === currentImageIndex ? 1 : 0,
						transition: {
							type: 'spring',
							duration: 0.5,
						},
					}}
				>
					<Image
						borderRadius="2xl"
						width={260}
						height={270}
						alt={`product:${src}`}
						src={`https://utfs.io/f/${src}`}
						quality={100}
						onLoadingComplete={() => setIsLoadedImg(true)}
					/>
				</Skeleton>
			))}
		</Stack>
	);
};

export default ProductCardImg;
