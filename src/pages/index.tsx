import { api } from '~/utils/api';

export default function Home() {
	const { data: user } = api.user.get.useQuery();
	return (
		<>
			<main>{user?.role}</main>
		</>
	);
}
