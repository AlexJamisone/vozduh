import { Icon, IconButton, Stack, useToast } from '@chakra-ui/react';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { useOfflineShop } from '~/store/useOfflineShop';
import { api } from '~/utils/api';
import { UploadDropzone } from '~/utils/uploadthing';

export default function OfflineImage() {
	const [image, set] = useOfflineShop((state) => [state.image, state.setImg]);
	const toast = useToast();
	const { mutate: deletSinglImg, isLoading } =
		api.product.deletSinglImg.useMutation({
			onSuccess: () => {
				toast({
					description: 'Картинка успешно удалена',
					status: 'info',
				});
				set('');
			},
		});

	return (
		<Stack>
			{!image && (
				<UploadDropzone
					endpoint="offlineShop"
					config={{ mode: 'auto' }}
					onClientUploadComplete={(res) => set(res[0]?.key ?? '')}
				/>
			)}
			{image && (
				<Stack position="relative">
					<Image
						alt="offline-shop"
						quality={100}
						width={200}
						height={200}
						style={{ objectFit: 'contain' }}
						src={`https://utfs.io/f/${image}`}
					/>
					<IconButton
						isLoading={isLoading}
						onClick={() => deletSinglImg(image)}
						aria-label="delet-image"
						icon={<Icon as={MdDelete} />}
						isRound
						size="sm"
						colorScheme="red"
						position="absolute"
						top={3}
						right={-3}
					/>
				</Stack>
			)}
		</Stack>
	);
}
