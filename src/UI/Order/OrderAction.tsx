import { Button } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCreateAddressContext } from '~/context/addressContext';

const OrderAction = () => {
	const { address } = useCreateAddressContext();
	const notEmty =
		address.firstName &&
		address.lastName &&
		address.selectPoint &&
		address.contactPhone.length === 16 &&
		address.confirmPoint;
	return (
		<AnimatePresence>
			{notEmty && (
				<Button
					colorScheme="telegram"
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
				>
					Заказать
				</Button>
			)}
		</AnimatePresence>
	);
};

export default OrderAction;
