import { Icon, IconButton, useToast } from '@chakra-ui/react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { api } from '~/utils/api';

const NotificationButton = () => {
	const { data: role } = api.user.getRole.useQuery();
	const toast = useToast();
	const handClick = async () => {
		const permission = await Notification.requestPermission();
		if (permission === 'granted') {
			new Notification('Уведомления успешно включены ✔', {
				body: 'Теперь вы будете уведомленны о каждом новом заказе!',
			});
		} else {
			toast({
				description: 'Вы запретили уведомления ❌',
				status: 'error',
				isClosable: true,
			});
		}
	};
	return (
		<>
			{role === 'ADMIN' && (
				<IconButton
					variant="outline"
					aria-label="notification"
					icon={<Icon as={IoMdNotificationsOutline} />}
					onClick={() => void handClick()}
				/>
			)}
		</>
	);
};

export default NotificationButton;
