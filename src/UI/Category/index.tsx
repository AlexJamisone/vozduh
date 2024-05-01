import { Center } from '@chakra-ui/react';
import { api } from '~/utils/api';
import CategoryCard from './CategoryCard';

const Category = () => {
	const { data: categorys } = api.categorys.get.useQuery();
	return (
		<Center
			w="100%"
			as="section"
			flexWrap="wrap"
			position="relative"
			justifyContent="center"
			id="collection"
		>
			{categorys?.map((cat, index) => (
				<CategoryCard key={cat.id} category={cat} index={index} />
			))}
		</Center>
	);
};

export default Category;
