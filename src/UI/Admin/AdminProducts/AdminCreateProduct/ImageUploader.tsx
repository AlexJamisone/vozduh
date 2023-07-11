import { Progress, useToast } from '@chakra-ui/react';
import { UploadDropzone } from '@uploadthing/react';
import '@uploadthing/react/styles.css';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useProductContext } from '~/context/productContext';
import type { OurFileRouter } from '~/server/uploadthing';
const ImageUploader = () => {
	const { state, dispatch } = useProductContext();
	const toast = useToast();
	const [progress, setProgress] = useState({
		show: false,
		value: 0,
	});
	return (
		<>
			<UploadDropzone<OurFileRouter>
				endpoint="imageUploader"
				onUploadProgress={(value) => {
					setProgress({
						show: true,
						value,
					});
				}}
				onUploadError={(error) => {
					toast({
						description: `Произошла ошибка: ${error.message}`,
						status: 'error',
						isClosable: true,
						position: 'top-right',
					});
				}}
				onClientUploadComplete={(res) => {
					setProgress({
						show: false,
						value: 0,
					});
					if (!res) throw new Error('Проблемы с загрузкой фото');
					dispatch({
						type: 'SET_PRODUCT',
						payload: {
							...state.product,
							image: [
								...state.product.image,
								...res.map(({ fileKey }) => fileKey),
							],
						},
					});
					toast({
						description: 'Фото успешно загружено!',
						status: 'success',
						position: 'top-right',
						isClosable: true,
					});
				}}
			/>
			{progress.show && (
				<Progress
					as={motion.div}
					isAnimated
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					value={progress.value}
					hasStripe
					colorScheme="telegram"
					borderRadius="2xl"
				/>
			)}
		</>
	);
};

export default ImageUploader;
