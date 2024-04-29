import { Center } from '@chakra-ui/react';
import { getAuth } from '@clerk/nextjs/server';
import type { Role } from '@prisma/client';
import type { GetServerSideProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserProfile from '~/UI/User/Profile/UserProfile';
import UserFavorites from '~/UI/User/UserFavorites';
import UserSettings from '~/UI/User/UserSettings';
import { prisma } from '~/server/db';

export const getServerSideProps = (async ({ req }) => {
	const { userId } = getAuth(req);
	if (!userId) return { props: { role: null } };
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: {
			role: true,
		},
	});
	return { props: { role: user?.role ?? null } };
}) satisfies GetServerSideProps<{ role: Role | null }>;

const ProfileRouter = ({
	role,
}: InferGetStaticPropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const { path } = router.query;
	useEffect(() => {
		if (role !== 'USER') void router.push('/');
        // eslint-disable-next-line
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
