import { useEffect, useState } from 'react';
import { pusherFront } from '~/lib/pusherFront';
export type NotificationProps = {
	name: string;
	city: string;
	productName: string;
	productImg: string;
	sum: number;
};
//make this better
const AdminNotification = () => {
	const [notification, setNotification] = useState<
		NotificationProps | undefined
	>(undefined);
	const channel = pusherFront.subscribe('order');
	channel.bind('new-order', (payload: NotificationProps) => {
		setNotification(payload);
	});
	useEffect(() => {
		if (Notification.permission === 'granted' && notification) {
			const notificationMessage = new Notification(
				`Новый заказ от ${notification.name} на сумму ${notification.sum}`,
				{
					body: `${notification.productName} в город ${notification.city}`,
					icon: `https://utfs.io/f/${notification.productImg}`,
				}
			);
			notificationMessage.onclose = () => setNotification(undefined);
		}
	}, [notification]);
	return <></>;
};

export default AdminNotification;
