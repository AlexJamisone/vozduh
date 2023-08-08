import { useEffect, useState } from 'react';
import { pusherFront } from '~/lib/pusherFront';
export type NotificationProps = {
	name: string;
	city: string;
	productName: string;
	productImg: string;
	sum: number;
};
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
			new Notification(
				`Новый заказ от ${notification.name} на сумму ${notification.sum}`,
				{
					body: `${notification.productName} в город ${notification.city}`,
					icon: `https://utfs.io/f/${notification.productImg}`,
				}
			);
		}
		return () => setNotification(undefined);
	}, [notification]);
	return <></>;
};

export default AdminNotification;
