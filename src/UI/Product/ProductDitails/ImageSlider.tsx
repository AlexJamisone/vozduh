import { Icon, IconButton, Image, Stack } from '@chakra-ui/react';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
const ImageSlider = ({ images }: { images: string[] }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [emblaRef, emblaApi] = useEmblaCarousel({
		startIndex: 0,
	});
	const [emblaThumbRef, emblaThumbApi] = useEmblaCarousel({
		dragFree: true,
		containScroll: 'keepSnaps',
	});
	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaApi || !emblaThumbApi) return;
			emblaApi.scrollTo(index);
		},
		[emblaApi, emblaThumbApi]
	);
	const onSelect = useCallback(() => {
		if (!emblaApi || !emblaThumbApi) return;
		setSelectedIndex(emblaApi.selectedScrollSnap());
		emblaThumbApi.scrollTo(emblaApi.selectedScrollSnap());
	}, [emblaApi, emblaThumbApi]);
	useEffect(() => {
		if (!emblaApi) return;
		onSelect();
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);
	}, [emblaApi, onSelect]);

	return (
		<Stack w="100%">
			<Stack ref={emblaRef} overflow="hidden" position="relative">
				<Stack direction="row">
					{images.map((src, index) => (
						<Image
							key={index}
							alt={`${src}`}
							src={`https://utfs.io/f/${src}`}
							flex="0 0 100%"
							w={['100%', 250, 300, 499]}
							h={[100, 300]}
							objectFit="cover"
						/>
					))}
				</Stack>
				<IconButton
					position="absolute"
					variant="ghost"
					aria-label="prev"
					icon={
						<Icon
							as={MdOutlineKeyboardArrowLeft}
							boxSize={7}
							fill="whiteAlpha.800"
						/>
					}
					top="45%"
					left={0}
					rounded="full"
					onClick={() => emblaApi?.scrollPrev()}
				/>
				<IconButton
					position="absolute"
					variant="ghost"
					aria-label="next"
					icon={
						<Icon
							as={MdOutlineKeyboardArrowRight}
							boxSize={7}
							fill="whiteAlpha.800"
						/>
					}
					top="45%"
					right={0}
					rounded="full"
					onClick={() => emblaApi?.scrollNext()}
				/>
			</Stack>
			<Stack
				ref={emblaThumbRef}
				direction="row"
				justifyContent="center"
				overflow="hidden"
			>
				{images.map((src, index) => (
					<Image
						alt={`${src}`}
						src={`https://utfs.io/f/${src}`}
						key={src}
						w={100}
						h={90}
						objectFit="cover"
						cursor="pointer"
						onClick={() => onThumbClick(index)}
						opacity={index === selectedIndex ? 1 : 0.2}
						transition="opacity .2s ease-in-out"
					/>
				))}
			</Stack>
		</Stack>
	);
};

export default ImageSlider;
