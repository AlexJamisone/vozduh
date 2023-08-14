import { Image } from '@chakra-ui/next-js';
import { Skeleton, Stack, useBreakpoint } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProductCardContext } from '~/context/productCardContext';

const ProductCardImg = () => {
	const { product } = useProductCardContext();
	const [isLoadedImg, setIsLoadedImg] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const point = useBreakpoint({ ssr: true });
	return (
		<Stack
			w={[130, 260]}
			h={[100, 270]}
			position="relative"
			justifyContent="center"
			alignItems="center"
		>
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
						width={point === 'base' ? 130 : 260}
						height={point === 'base' ? 100 : 270}
						alt={`product:${src}`}
						src={`https://utfs.io/f/${src}`}
						objectFit="cover"
						quality={100}
						onLoadingComplete={() => setIsLoadedImg(true)}
					/>
				</Skeleton>
			))}
		</Stack>
	);
};

export default ProductCardImg;
