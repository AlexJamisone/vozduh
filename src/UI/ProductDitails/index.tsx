import { Stack } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import ProductDitalsInfo from './ProductDitalsInfo';
import ProductDitalsPhoto from './ProductDitalsPhoto';

type ProductDitailsProps = {
	info?: ReactNode;
	photo?: ReactNode;
};

const ProductDitails = ({ info, photo }: ProductDitailsProps) => {
	return (
		<Stack direction="row">
			{photo}
			{info}
		</Stack>
	);
};
ProductDitails.Photo = ProductDitalsPhoto;
ProductDitails.Info = ProductDitalsInfo;

export default ProductDitails;
