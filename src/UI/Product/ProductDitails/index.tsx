import { Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import ImageSlider from './ImageSlider';
import ProductDitalsInfo from './ProductDitalsInfo';

type ProductDitailsProps = {
	info?: ReactNode;
	photo?: ReactNode;
};

const ProductDitails = ({ info, photo }: ProductDitailsProps) => {
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
					type: 'spring',
					duration: 0.5,
					delay: 0.5,
				},
			}}
		>
			{photo}
			{info}
		</Stack>
	);
};
ProductDitails.Photo = ImageSlider;
ProductDitails.Info = ProductDitalsInfo;

export default ProductDitails;
