import { Text, useColorMode } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import AnimataedLayout from '~/components/AnumationLayout';
import { api } from '~/utils/api';

export default function Order() {
    const {isSignedIn} = useAuth()
	const router = useRouter();
	const { colorMode } = useColorMode();
	const id = router.query.id as string;
	const {
		data: order,
		isLoading,
		isError,
	} = api.order.get.useQuery(id, {
		enabled: !!id,
	});
	if (isError) {
		void router.push('/404');
	}
	return (
		<AnimataedLayout pt={150}>
			{isLoading && (
				<video
					muted
					autoPlay
					loop
					src="https://cdnl.iconscout.com/lottie/premium/thumb/rotating-rainbow-spinner-9966359-8129402.mp4"
					className="load-order"
				/>
			)}
			{order && (
				<AnimataedLayout
					alignItems="center"
					flexDirection="column"
					gap={5}
				>
					<video
						className="success-v"
						src={
							colorMode === 'dark'
								? 'https://cdnl.iconscout.com/lottie/premium/thumb/success-7178171-5842336.mp4'
								: 'https://cdnl.iconscout.com/lottie/premium/thumb/success-8929513-7271830.mp4'
						}
						muted
						autoPlay
						width={300}
						height={300}
						style={{
							marginTop: '-50px',
						}}
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
						На сумму {order.total.toLocaleString('ru-RU')} ₽.
						<br />
						Мы свяжемся с вами для подтверждения в ближайшее время.
						<br /> Спасибо!
					</Text>
					<motion.a
						href={isSignedIn ? "/profile/main" : "/"}
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
						style={{
							color: colorMode === 'dark' ? 'white' : undefined,
							borderColor:
								colorMode === 'dark' ? 'white' : undefined,
						}}
					>
						{isSignedIn ? "В личный кабинет" :"На главную"}
					</motion.a>
				</AnimataedLayout>
			)}
		</AnimataedLayout>
	);
}
