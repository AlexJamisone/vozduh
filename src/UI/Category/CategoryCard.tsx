import { Link } from '@chakra-ui/next-js';
import { Image, Stack, Text } from '@chakra-ui/react';
import type { Category } from '@prisma/client';
import { motion } from 'framer-motion';

type CategoryCardProps = {
	category: Category;
	index: number;
};

const CategoryCard = ({ category, index }: CategoryCardProps) => {
	return (
		<Stack
			w={['100%', null, '33.33%']}
			h="100%"
			flexWrap="wrap"
			bg="white"
			position="relative"
			overflow="hidden"
			as={Link}
			cursor="pointer"
			href={`category/${category.path}`}
		>
			<Stack
				position="absolute"
				left={0}
				pl={10}
				mt={10}
				h={10}
				bgColor="gray.50"
				zIndex={20}
				as={motion.div}
				layout
				initial={{ opacity: 0 }}
				whileInView={{
					opacity: 1,
					transition: {
						type: 'spring',
						duration: 0.3,
						delay: 0.3 * index,
						stiffness: 50,
					},
				}}
				roundedRight={20}
			>
				<Text fontSize="2xl" pr={5} textColor="black">
					{category.title}
				</Text>
			</Stack>
			<Stack
				as={motion.div}
				whileHover={{
					scale: 1.1,
					transition: {
						duration: 0.7,
						type: 'spring',
					},
				}}
			>
				<Image
					src={`https://utfs.io/f/${category.image}`}
					alt={category.path}
					w={'container'}
					h={[200, 350]}
					objectFit="cover"
				/>
			</Stack>
		</Stack>
	);
};

export default CategoryCard;
