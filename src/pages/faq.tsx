import { Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import FAQ from '~/UI/FAQ';

const FAQPage = () => {
	return (
		<Center as={motion.main} pt={[100, 150]}>
			<FAQ />
		</Center>
	);
};

export default FAQPage;
