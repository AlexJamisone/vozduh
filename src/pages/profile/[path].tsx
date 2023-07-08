import { UserProfile as UserSettings } from '@clerk/nextjs';
import { useRouter } from 'next/router';
import UserFavorites from '~/UI/User/UserFavorites';
import UserProfile from '~/UI/User/UserProfile';
const ProfileRouter = () => {
	const router = useRouter();
	const { path } = router.query;
	const handlRouter = () => {
		switch (path) {
			case '/':
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
