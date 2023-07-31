import { Button } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCreateAddressContext } from '~/context/addressContext';
type OrderActionProps = {
	action: () => void;
};
const OrderAction = ({ action }: OrderActionProps) => {
	const { address } = useCreateAddressContext();
	return (
		<AnimatePresence>
			<Button
				border={address.errorConfirm ? '1px solid' : undefined}
				borderColor={address.errorConfirm ? 'orange.300' : undefined}
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
				onClick={action}
			>
				Заказать
			</Button>
		</AnimatePresence>
	);
};

export default OrderAction;
