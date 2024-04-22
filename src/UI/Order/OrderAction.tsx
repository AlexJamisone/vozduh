import { Button } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { api } from '~/utils/api';
const OrderAction = () => {
	const {} = api.order.createNoAddreess.useMutation();
	const {} = api.order.createIsAuthHaveAddress.useMutation();
	return (
		<AnimatePresence>
			<Button
				as={motion.button}
				initial={{ opacity: 0, y: 50 }}
				animate={{
					opacity: 1,
					y: 0,
					transition: {
						type: 'spring',
						duration: 0.5,
					},
				}}
				exit={{
					y: 50,
					opacity: 0,
					transition: {
						duration: 0.5,
						type: 'spring',
					},
				}}
				onClick={() => {}}
			>
				Заказать
			</Button>
		</AnimatePresence>
	);
};

export default OrderAction;
