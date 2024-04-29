import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import TotalSum from '~/components/TotalSum';
import { useAddress } from '~/store/useAddress';
import { useCart } from '~/store/useCart';
import { api } from '~/utils/api';
import CreateAddress from '../Address';
import CartItem from '../Cart/CartItem';
import UserAddressCard from '../User/Profile/UserAddress/UserAddressCard';
import OrderAction from './OrderAction';

const NewOrder = () => {
	const { isSignedIn } = useAuth();
	const [items, total] = useCart((state) => [state.items, state.total]);
	const setId = useAddress((state) => state.setEdit);
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);
	const { data: addressList } = api.address.get.useQuery();

	return (
		<Stack py={75}>
			{isSignedIn ? (
				addressList?.length === 0 ? (
					<CreateAddress />
				) : (
					<Stack>
						<RadioGroup onChange={(id) => setId({ is: false, id })}>
							<Stack>
								{addressList?.map((address, index) => (
									<Radio key={address.id} value={address.id}>
										<UserAddressCard
											address={address}
											index={index}
										/>
									</Radio>
								))}
							</Stack>
						</RadioGroup>
						<CreateAddress adrLen={addressList?.length} />
					</Stack>
				)
			) : (
				<CreateAddress />
			)}
			<Stack>
				{isClient && (
					<AnimatePresence>
						{items.map((item, index) => (
							<CartItem key={index} item={item} index={index} />
						))}
					</AnimatePresence>
				)}
			</Stack>
			<TotalSum sum={total} />
			<OrderAction />
		</Stack>
	);
};

export default NewOrder;
