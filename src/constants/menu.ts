import type { Role } from '@prisma/client';
import { AiOutlineLineChart } from 'react-icons/ai';
import { FaRegRectangleList } from 'react-icons/fa6';
import { GoHeart } from 'react-icons/go';
import { LiaRingSolid, LiaUserSolid } from 'react-icons/lia';
import type { IconType } from 'react-icons/lib';
import { SlSettings } from 'react-icons/sl';

type MenuActions = {
	id: number;
	path: string;
	icon: IconType;
	title: string;
};

export const menu_link = (role: Role): MenuActions[] | undefined => {
	switch (role) {
		case 'ADMIN':
			return [
				{
					id: 1,
					path: '/admin/orders',
					title: 'Заказы',
					icon: FaRegRectangleList,
				},
				{
					id: 2,
					path: '/admin/products',
					title: 'Товары',
					icon: LiaRingSolid,
				},
				{
					id: 3,
					path: '/admin/some_ref',
					title: 'Посещения',
					icon: AiOutlineLineChart,
				},
			];
		case 'USER':
			return [
				{
					id: 4,
					path: '/profile',
					icon: LiaUserSolid,
					title: 'Профиль',
				},
				{
					id: 5,
					path: '/profile/favorites',
					icon: GoHeart,
					title: 'Избранное',
				},
				{
					id: 6,
					path: '/profile/settings',
					icon: SlSettings,
					title: 'Настройки',
				},
			];
		default:
			break;
	}
};
