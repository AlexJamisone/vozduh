// import { Image } from '@chakra-ui/next-js';
import { Center } from '@chakra-ui/react';
import { api } from '~/utils/api';
import CategoryCard from './CategoryCard';

const Category = () => {
	const { data: categorys } = api.categorys.get.useQuery();
	return (
		<Center w="100%" flexWrap="wrap" position="relative">
			{categorys?.map((cat) => (
				<CategoryCard key={cat.id} category={cat} />
			))}
		</Center>
	);
};

export default Category;
