import { Link } from '@chakra-ui/next-js';
import { Image, Stack, Text } from '@chakra-ui/react';
import type { Category } from '@prisma/client';
import { motion } from 'framer-motion';

type CategoryCardProps = {
	category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
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
			href={category.path}
		>
			<Text
				position="absolute"
				top={50}
				left={50}
				fontSize="2xl"
				textColor="black"
				zIndex={20}
			>
				{category.title}
			</Text>
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
					src={category.image}
					alt={category.path}
					objectFit="fill"
				/>
			</Stack>
		</Stack>
	);
};

export default CategoryCard;
