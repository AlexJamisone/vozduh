import { Icon, IconButton, Stack, Text, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { useCreateCategory } from '~/store/useCreateCategory';
import { api } from '~/utils/api';
import { UploadDropzone } from '~/utils/uploadthing';

const CategoryImg = () => {
	const toast = useToast();
	const [set, img, error, reset] = useCreateCategory((state) => [
		state.setImg,
		state.image,
		state.error,
		state.reset,
	]);
	const { mutate: deletImg, isLoading } = api.categorys.deletImg.useMutation({
		onSuccess: (message) => {
			toast({
				description: message,
				status: 'info',
			});
			set('');
		},
		onError: ({ message }) => {
			toast({ description: message, status: 'error' });
		},
	});
	const isError = error?.is && error.path.fieldErrors.image !== undefined;
	return (
		<Stack alignItems="center">
			{!img && (
				<Stack>
					<UploadDropzone
						endpoint="categoryImage"
						config={{ mode: 'auto' }}
						appearance={{
							container: {
								borderColor: isError ? 'red' : undefined,
							},
						}}
						onClientUploadComplete={(res) => {
							if (error?.is) {
								reset();
							}
							set(res[0]?.key ?? '');
							toast({
								description: 'Картинка успешно загружена!',
								status: 'success',
							});
						}}
						onUploadError={({ name, code }) =>
							toast({
								description: `${name} ${code}`,
								status: 'error',
							})
						}
					/>
					{isError && (
						<Text textColor="red.400">
							{error.path.fieldErrors.image?.[0]}
						</Text>
					)}
				</Stack>
			)}
			{img && (
				<Stack position="relative" width="fit-content">
					<Image
						width={200}
						height={100}
						style={{ objectFit: 'contain' }}
						src={`https://utfs.io/f/${img}`}
						alt="category"
						quality={100}
					/>
					<IconButton
						isLoading={isLoading}
						onClick={() => deletImg(img)}
						aria-label="delet-img-category"
						icon={<Icon as={MdDelete} />}
						colorScheme="red"
						isRound
						size="xs"
						position="absolute"
						top={-3}
						right={-3}
					/>
				</Stack>
			)}
		</Stack>
	);
};
export default CategoryImg;
