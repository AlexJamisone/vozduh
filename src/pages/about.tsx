import { Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import AboutSection from '~/UI/AboutSection';

const AboutPage = () => {
	return (
		<Center
			as={motion.main}
			pt={[100, 150]}
			mx={[10, 0]}
			flexDirection="column"
		>
			<AboutSection />
		</Center>
	);
};

export default AboutPage;
