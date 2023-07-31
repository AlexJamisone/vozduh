import { Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NewOrder from '~/UI/Order';
const OrderPage = () => {
	return (
		<Center pt={150} as={motion.div} layout>
			<NewOrder />
		</Center>
	);
};

export default OrderPage;
