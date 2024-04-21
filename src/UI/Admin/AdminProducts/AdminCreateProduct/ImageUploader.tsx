import { IconButton, Stack, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { useCreateProduct } from '~/store/useCreateProduct';
import { api } from '~/utils/api';
import { UploadDropzone } from '~/utils/uploadthing';

const ImageUploader = () => {
	const toast = useToast();
	const { mutate: deletSinglImg, isLoading } =
		api.product.deletSinglImg.useMutation({
			onSuccess: (id) => {
				toast({
					description: 'Фото успешно удалено',
					status: 'info',
					position: 'top-right',
					isClosable: true,
				});
				set(image.filter((key) => key !== id));
			},
		});
	const [image, set] = useCreateProduct((state) => [
		state.image,
		state.setImage,
	]);
	return (
		<Stack>
			{image.length < 5 && (
				<UploadDropzone
					endpoint="createProduct"
					config={{ mode: 'auto' }}
					onClientUploadComplete={(res) =>
						set(res.map(({ key }) => key))
					}
				/>
			)}
			{image.length !== 0 && (
				<Stack flexWrap="wrap">
					{image.map((key) => (
						<Stack key={key} position="relative">
							<Image
								src={`https://utfs.io/f/${key}`}
								width={100}
								alt={`${key}`}
								height={100}
							/>
							<IconButton
								onClick={() => deletSinglImg(key)}
								isLoading={isLoading}
								colorScheme="red"
								aria-label="delet-img-product"
								isRound
								position="absolute"
								top={-3}
								right={-3}
							/>
						</Stack>
					))}
				</Stack>
			)}
		</Stack>
	);
};

export default ImageUploader;
