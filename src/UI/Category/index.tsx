import { Center } from '@chakra-ui/react';
import CategoryCard from './CategoryCard';
import type { Category } from '@prisma/client';

const Category = ({categorys}: {categorys: Category[]}) => {
	return (
		<Center
			w="100%"
			as="section"
			flexWrap="wrap"
			position="relative"
			justifyContent="center"
			id="collection"
			gap={7}
		>
			{categorys?.map((cat, index) => (
				<CategoryCard key={cat.id} category={cat} index={index} />
			))}
		</Center>
	);
};

export default Category;
