import { Image, Stack, Text } from '@chakra-ui/react';
import type { Category } from '@prisma/client';
import { motion } from 'framer-motion';

type CategoryCardProps = {
	category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
	return (
		<Stack
			w="33.33%"
			h="100%"
			bg="white"
			position="relative"
			overflow="hidden"
			as={motion.div}
			layout
		>
			<Text
				position="absolute"
				top={50}
				left={50}
				fontSize={16}
				textColor="black"
			>
				{category.title}
			</Text>
			<Stack as={motion.div} whileHover={{ scale: 1.1 }}>
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
