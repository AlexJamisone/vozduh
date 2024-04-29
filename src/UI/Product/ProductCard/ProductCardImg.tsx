import { Skeleton, Stack, useBreakpoint } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const ProductCardImg = ({ images }: { images: string[] }) => {
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
			{images.map((src, index) => (
				<Skeleton
					position="absolute"
					key={src}
					isLoaded={isLoadedImg}
					onMouseEnter={() =>
						setCurrentImageIndex(
							(prevIndex) => (prevIndex + 1) % images.length
						)
					}
					onMouseLeave={() =>
						setCurrentImageIndex(
							(prevIndex) => (prevIndex - 1) % images.length
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
						width={point === 'base' ? 130 : 260}
						height={point === 'base' ? 100 : 270}
						alt={`product:${src}`}
						src={`https://utfs.io/f/${src}`}
						style={{
							objectFit: 'cover',
						}}
						quality={100}
						onLoadingComplete={() => setIsLoadedImg(true)}
					/>
				</Skeleton>
			))}
		</Stack>
	);
};

export default ProductCardImg;
