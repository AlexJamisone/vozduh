import { Image } from '@chakra-ui/next-js';
import { Icon, IconButton, Skeleton, Stack, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useProductContext } from '~/context/productContext';
import { api } from '~/utils/api';
type ProductImageProps = {
	src: string;
};

const ProductImage = ({ src }: ProductImageProps) => {
	const { dispatch, state } = useProductContext();
	const [isLoadingImg, setIsLoadingImg] = useState(false);
	const { mutate: deleteSinglImg, isLoading } =
		api.product.deletSinglImg.useMutation();
	const toast = useToast();
	return (
		<Stack position="relative" as={motion.div} layout>
			<Skeleton isLoaded={isLoadingImg}>
				<Image
					width={100}
					height={100}
					src={`https://utfs.io/f/${src}`}
					alt={`product${src}`}
					quality={100}
					onLoadingComplete={() => setIsLoadingImg(true)}
				/>
			</Skeleton>
			<IconButton
				as={motion.button}
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: {
						type: 'spring',
						duration: 0.3,
						delay: 0.3,
					},
				}}
				top={-3}
				right={-3}
				size="xs"
				position="absolute"
				borderRadius="full"
				aria-label="delet"
				colorScheme="red"
				icon={<Icon as={RxCross2} />}
				isLoading={isLoading}
				onClick={() =>
					deleteSinglImg(
						{ src },
						{
							onSuccess: () => {
								if (
									state.controlView.category ||
									state.controlView.editCategory
								) {
									dispatch({
										type: 'SET_CATEGORY',
										payload: {
											...state.category,
											image: '',
										},
									});
								} else {
									dispatch({
										type: 'SET_PRODUCT',
										payload: {
											...state.product,
											image: state.product.image.filter(
												(oldSrc) =>
													!oldSrc.includes(src)
											),
										},
									});
								}
								toast({
									description: 'Картинка успешно удалена',
									isClosable: true,
									status: 'info',
									position: 'top-right',
								});
							},
						}
					)
				}
			/>
		</Stack>
	);
};

export default ProductImage;
