import { Image } from '@chakra-ui/next-js';
import { Card, CardBody, Stack } from '@chakra-ui/react';
import { useProductContext } from '~/context/productContext';

const CardWithImage = () => {
	const { state } = useProductContext();
	return (
		<>
			{state.product.image.length !== 0 && (
				<Card>
					<CardBody
						as={Stack}
						direction="row"
						flexWrap="wrap"
						justifyContent="center"
					>
						{state.product.image.map((src) => (
							<Image
								key={src}
								width={100}
								height={100}
								src={`https://utfs.io/f/${src}`}
								alt={`product${src}`}
								quality={100}
							/>
						))}
					</CardBody>
				</Card>
			)}
		</>
	);
};

export default CardWithImage;
