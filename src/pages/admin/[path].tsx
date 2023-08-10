import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import AdminOrders from '~/UI/Admin/AdminOrders';
import AdminProducts from '~/UI/Admin/AdminProducts';
import { api } from '~/utils/api';
const AdminRouter = () => {
	const { data: role } = api.user.getRole.useQuery();
	const router = useRouter();
	const { path } = router.query;
	useEffect(() => {
		if (role !== 'ADMIN') void router.push('/');
	}, []);
	const handlRouter = () => {
		switch (path) {
			case 'orders':
				return <AdminOrders />;
			case 'products':
				return (
					<AdminProducts
						product={<AdminProducts.Product />}
						size={<AdminProducts.Size />}
						category={<AdminProducts.Category />}
						menu={<AdminProducts.Menu />}
					/>
				);
		}
	};
	return (
		<Center pt={[100, 175]} mb={75}>
			{handlRouter()}
		</Center>
	);
};

export default AdminRouter;
