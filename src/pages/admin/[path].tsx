import { useRouter } from 'next/router';
import AdminOrders from '~/UI/Admin/AdminOrders';
import AdminProducts from '~/UI/Admin/AdminProducts';
const AdminRouter = () => {
	const router = useRouter();
	const { path } = router.query;
	console.log(path);
	const handlRouter = () => {
		switch (path) {
			case 'orders':
				return <AdminOrders />;
			case 'products':
				return <AdminProducts />;
		}
	};
	return <>{handlRouter()}</>;
};

export default AdminRouter;
