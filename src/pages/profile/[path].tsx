import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserProfile from '~/UI/User/Profile/UserProfile';
import UserFavorites from '~/UI/User/UserFavorites';
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
				return (
					<UserProfile
						info={<UserProfile.Info />}
						address={<UserProfile.Address />}
						orders={<UserProfile.Orders />}
					/>
				);
			case 'favorites':
				return <UserFavorites />;
			case 'settings':
				return <UserSettings />;
		}
	};
	return (
		<Center pt={[100, 200]} pb={[75]} w="100%">
			{handlRouter()}
		</Center>
	);
};

export default ProfileRouter;
