import { Link } from '@chakra-ui/next-js';
import { Center } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FAQButton = () => {
	const { scrollYProgress } = useScroll();
	const scroll = useTransform(scrollYProgress, [0, 1], [40, 55]);
	return (
		<motion.div
			style={{
				bottom: scroll,
				position: 'fixed',
				left: 40,

				boxShadow:
					'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px,rgba(0, 0, 0, 0.2) 0px 5px 10px,rgba(0, 0, 0, 0.4) 0px 15px 40px',
				borderRadius: '50px',
				width: '65px',
				height: '65px',
				cursor: 'pointer',
				zIndex: 99,
				textAlign: 'center',
				backgroundColor: 'Menu',
			}}
			initial={{
				opacity: 0,
			}}
			animate={{
				opacity: 1,
				transition: {
					type: 'spring',
					duration: 0.5,
				},
			}}
			whileHover={{
				scale: 1.2,
				transition: {
					type: 'spring',
					duration: 0.3,
				},
			}}
		>
			<Center
				_hover={{
					textDecoration: 'none',
				}}
				as={Link}
				href="/faq"
				fontWeight={600}
				w="100%"
				h="100%"
				fontSize={[12, 16]}
			>
				F.A.Q.
			</Center>
		</motion.div>
	);
};

export default FAQButton;
