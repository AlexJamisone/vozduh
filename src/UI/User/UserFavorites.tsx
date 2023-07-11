import { api } from '~/utils/api';

const UserFavorites = () => {
	const { data: favoritersProducts } = api.favorites.get.useQuery();
	return <div>UserFavorites</div>;
};

export default UserFavorites;
