import { Center } from '@chakra-ui/react';
import AboutSection from '~/UI/AboutSection';

const AboutPage = () => {
	return (
		<Center
			pt={[100, 150]}
			pb={[100, 0]}
			mx={[10, 0]}
			flexDirection="column"
			fontFamily="Jost, sans-serif"
		>
			<AboutSection />
		</Center>
	);
};

export default AboutPage;
