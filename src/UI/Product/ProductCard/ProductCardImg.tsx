import { Skeleton, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const ProductCardImg = ({ images }: { images: string[] }) => {
	const [isLoadedImg, setIsLoadedImg] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
					width="100%"
					height="100%"
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
						fill
						alt={`product:${src}`}
						src={`https://utfs.io/f/${src}`}
						style={{
							objectFit: 'contain',
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
