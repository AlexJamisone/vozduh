import { RiHeartsFill } from 'react-icons/ri';
import NoData from '~/components/NoData';
import { api } from '~/utils/api';
import ProductCard from '../Product/ProductCard';

const UserFavorites = () => {
	const { data: favoritersProducts } =
		api.favorites.favoritesProducts.useQuery();
	if (favoritersProducts?.favorites.length === 0)
		return <NoData title="Нет товаров в избранном" icon={RiHeartsFill} />;
	return (
		<>
			{favoritersProducts?.favorites.map(({ product }, index) => (
				<ProductCard
					index={index}
					product={product}
					key={product.id}
					image={<ProductCard.Image />}
				/>
			))}
		</>
	);
};

export default UserFavorites;
