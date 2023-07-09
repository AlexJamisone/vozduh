import { Stack } from '@chakra-ui/react';
import type { ReactNode } from 'react';
import UserAddress from './UserAddress';
import UserInfo from './UserInfo';
import UserOrders from './UserOrders';

type UserProfileProps = {
	info?: ReactNode;
	address?: ReactNode;
	orders?: ReactNode;
};

const UserProfile = ({ info, address, orders }: UserProfileProps) => {
	return (
		<Stack direction={['column', null, 'row']}>
			<Stack>
				{info}
				{address}
			</Stack>
			{orders}
		</Stack>
	);
};

UserProfile.Info = UserInfo;
UserProfile.Address = UserAddress;
UserProfile.Orders = UserOrders;

export default UserProfile;
