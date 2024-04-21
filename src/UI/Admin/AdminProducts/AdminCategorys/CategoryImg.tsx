import { Icon, IconButton, Stack, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { useCreateCategory } from '~/store/useCreateCategory';
import { UploadDropzone } from '~/utils/uploadthing';

const CategoryImg = () => {
	const toast = useToast();
	const set = useCreateCategory((state) => state.setImg);
	const img = useCreateCategory((state) => state.image);
	return (
		<Stack>
			{!img && (
				<UploadDropzone
					endpoint="categoryImage"
					config={{ mode: 'auto' }}
					onClientUploadComplete={(res) => {
						res.map(({ key }) => set(key));
						toast({
							description: 'Картинка успешно загружена!',
							status: 'success',
							isClosable: true,
							position: 'top-right',
						});
					}}
					onUploadError={({ name, code }) =>
						toast({
							description: `${name} ${code}`,
							status: 'error',
							position: 'top-right',
						})
					}
				/>
			)}
			{img && (
				<Stack position="relative">
					<Image
						width={100}
						height={100}
						style={{ objectFit: 'contain' }}
						src={`https://utfs.io/f/${img}`}
						alt="category"
					/>
					<IconButton
						aria-label="delet-img-category"
						icon={<Icon as={MdDelete} />}
						colorScheme="red"
						isRound
						size="sm"
						position="absolute"
						top={3}
						right={3}
					/>
				</Stack>
			)}
		</Stack>
	);
};
export default CategoryImg;
