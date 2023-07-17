import { Image, Skeleton, Stack } from '@chakra-ui/react';
import useEmblaCarousel from 'embla-carousel-react';
import { useProductDitalsContext } from '~/context/productDitailsContext';
const ImageSlider = () => {
	const { product } = useProductDitalsContext();
	const [emblaRef] = useEmblaCarousel({
		startIndex: 0,
	});
	return (
		<Stack w={600} h="100%" ref={emblaRef} overflow="hidden">
			<Stack direction="row">
				{product.image.map((src, index) => (
					<Image
						key={index}
						alt={`${src}`}
						src={`https://utfs.io/f/${src}`}
						width={100}
						height={300}
						fallback={<Skeleton />}
						flex="0 0 100%"
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default ImageSlider;
