import { Button, Icon, Stack, useDisclosure } from '@chakra-ui/react';
import { useReducer } from 'react';
import { AiOutlinePlus, AiTwotoneShop } from 'react-icons/ai';
import NoData from '~/components/NoData';
import { initial, shopReducer } from '~/reducer/shopReducer';
import { api } from '~/utils/api';
import OfflineShopCard from './OfflineShopCard';
import OfflineShopModal from './OfflineShopModal';

const OfflineShop = () => {
	const { data: role } = api.user.getRole.useQuery();
	const { data: shops, isLoading } = api.shop.get.useQuery();
	const { isOpen, onClose, onToggle } = useDisclosure();
	const [state, dispatch] = useReducer(shopReducer, initial);

	return (
		<Stack alignItems="center" direction="row" gap={9} flexWrap="wrap">
			{role === 'ADMIN' && (
				<Button
					h={200}
					w={200}
					variant="outline"
					onClick={onToggle}
					leftIcon={<Icon as={AiOutlinePlus} />}
				>
					Создать магазин
				</Button>
			)}
			{shops?.length === 0 ? (
				<NoData icon={AiTwotoneShop} title="Нет магазинов" />
			) : (
				shops?.map((shop) => (
					<OfflineShopCard role={role} key={shop.id} shop={shop} />
				))
			)}
			<OfflineShopModal
				isOpen={isOpen}
				onClose={onClose}
				dispatch={dispatch}
				state={state}
			/>
		</Stack>
	);
};

export default OfflineShop;
