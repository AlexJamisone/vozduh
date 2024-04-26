import { Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AnimataedLayout from '~/components/AnumationLayout';
import { api } from '~/utils/api';

export default function Order() {
	const router = useRouter();
	const id = router.query.id as string;
	const {
		data: order,
		isLoading,
		isError,
	} = api.order.get.useQuery(id, {
		enabled: !!id,
	});
	if (isError) {
		router.push('/404');
	}
	return (
		<AnimataedLayout pt={150}>
			{isLoading && (
				<video
					muted
					autoPlay
					loop
					src="https://cdnl.iconscout.com/lottie/premium/thumb/rotating-rainbow-spinner-9966359-8129402.mp4"
				/>
			)}
			{order && (
				<AnimataedLayout
					alignItems="center"
					flexDirection="column"
					gap={5}
				>
					<video
						src="https://cdnl.iconscout.com/lottie/premium/thumb/success-8929513-7271830.mp4"
						muted
						autoPlay
						width={300}
						height={300}
						style={{ marginTop: '-50px' }}
					/>
					<Text
						as={motion.p}
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: {
								type: 'spring',
								duration: 0.5,
								delay: 2,
							},
						}}
						textAlign="center"
						fontFamily="Jost, sans-serif"
						mt={-10}
						position="relative"
						zIndex={20}
						fontSize={['md', '2xl']}
					>
						Ура! <br />
						Ваш заказ успешно создан!
						<br />
						Заказа №{order.orderNumber}
						<br />
						На сумму {order.total} ₽.
						<br />
						Мы свяжемся с вами для подтверждения в ближайшее время.
						<br /> Спасибо!
					</Text>
					<motion.a
						href="/"
						initial={{ opacity: 0 }}
						animate={{
							opacity: 1,
							transition: {
								type: 'spring',
								duration: 0.5,
								delay: 2,
								stiffness: 150,
							},
						}}
						whileHover={{
							scale: 1.05,
						}}
						className="order-link"
					>
						На главную
					</motion.a>
				</AnimataedLayout>
			)}
		</AnimataedLayout>
	);
}
