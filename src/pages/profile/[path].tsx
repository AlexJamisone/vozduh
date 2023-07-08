import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserFavorites from '~/UI/User/UserFavorites';
import UserProfile from '~/UI/User/UserProfile';
import UserSettings from '~/UI/User/UserSettings';
import { api } from '~/utils/api';

const ProfileRouter = () => {
	const router = useRouter();
	const { data: role } = api.user.getRole.useQuery();
	const { path } = router.query;
	useEffect(() => {
		if (role !== 'USER') void router.push('/');
	}, []);
	const handlRouter = () => {
		switch (path) {
			case 'main':
				return <UserProfile />;
			case 'favorites':
				return <UserFavorites />;
			case 'settings':
				return <UserSettings />;
		}
	};
	return <>{handlRouter()}</>;
};

export default ProfileRouter;
