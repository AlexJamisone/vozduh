import { Icon, IconButton, Stack, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { useCreateProduct } from '~/store/useCreateProduct';
import { api } from '~/utils/api';
import { UploadDropzone } from '~/utils/uploadthing';

function ImageItem({ f }: { f: string }) {
	const toast = useToast();
	const [image, set] = useCreateProduct((state) => [
		state.image,
		state.setImage,
	]);
	const { mutate: deletSinglImg, isLoading } =
		api.product.deletSinglImg.useMutation({
			onSuccess: (id) => {
				toast({
					description: 'Фото успешно удалено',
					status: 'info',
				});
				set(image.filter((key) => key !== id));
			},
		});
	return (
		<Stack position="relative">
			<Image
				src={`https://utfs.io/f/${f}`}
				width={100}
				alt={`${f}`}
				height={100}
				quality={50}
			/>
			<IconButton
				onClick={() => deletSinglImg(f)}
				isLoading={isLoading}
				icon={<Icon as={MdDelete} />}
				size="xs"
				colorScheme="red"
				aria-label="delet-img-product"
				isRound
				position="absolute"
				top={-3}
				right={-3}
			/>
		</Stack>
	);
}

export default function ImageUploader() {
	const [image, set, error, reset] = useCreateProduct((state) => [
		state.image,
		state.setImage,
		state.error,
		state.reset,
	]);
	const isError =
		error?.isError && error.path.fieldErrors.image !== undefined;
	return (
		<Stack>
			{image.length < 5 && (
				<Stack>
					<UploadDropzone
						endpoint="createProduct"
						config={{ mode: 'auto' }}
						onClientUploadComplete={(res) => {
							if (error?.isError) {
								reset();
							}
							const img = res.map(({ key }) => key);
							set(image.length !== 0 ? [...image, ...img] : img);
						}}
						appearance={{
							container: {
								borderColor: isError ? 'red' : undefined,
							},
						}}
					/>
					{isError && (
						<Text textColor="red.400">Загрузи изображение</Text>
					)}
				</Stack>
			)}
			{image.length !== 0 && (
				<Stack
					flexWrap="wrap"
					direction="row"
					justifyContent="center"
					gap={4}
				>
					{image.map((key) => (
						<ImageItem key={key} f={key} />
					))}
				</Stack>
			)}
		</Stack>
	);
}
