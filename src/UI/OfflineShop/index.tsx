import { Button, Icon, Stack, useDisclosure } from '@chakra-ui/react';
import { AiOutlinePlus, AiTwotoneShop } from 'react-icons/ai';
import NoData from '~/components/NoData';
import { api } from '~/utils/api';
import OfflineShopModal from './OfflineShopModal';

const OfflineShop = () => {
	const { data: role } = api.user.getRole.useQuery();
	const { data: shops, isLoading } = api.shop.get.useQuery();
	const { isOpen, onClose, onToggle } = useDisclosure();
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
			) : null}
			<OfflineShopModal isOpen={isOpen} onClose={onClose} />
		</Stack>
	);
};

export default OfflineShop;
