import { Center } from '@chakra-ui/react';
import { getAuth } from '@clerk/nextjs/server';
import type { Role } from '@prisma/client';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminOrders from '~/UI/Admin/AdminOrders';
import AdminProducts from '~/UI/Admin/AdminProducts';
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

const AdminRouter = ({
	role,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const router = useRouter();
	const { path } = router.query;
	useEffect(() => {
		if (role !== 'ADMIN') void router.push('/');
        // eslint-disable-next-line
	}, []);
	const handlRouter = () => {
		switch (path) {
			case 'orders':
				return <AdminOrders />;
			case 'products':
				return <AdminProducts />;
		}
	};
	return (
		<Center pt={[100, 175]} mb={75}>
			{handlRouter()}
		</Center>
	);
};

export default AdminRouter;
