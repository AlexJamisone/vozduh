import type { Role } from '@prisma/client';
import type { HTMLAttributeAnchorTarget } from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';
import { FaRegRectangleList } from 'react-icons/fa6';
import { GoHeart } from 'react-icons/go';
import { LiaRingSolid, LiaUserSolid } from 'react-icons/lia';
import type { IconType } from 'react-icons/lib';
import { SlSettings } from 'react-icons/sl';
import { v4 as uuid } from 'uuid';

type MenuActions = {
	id: string;
	path: string;
	icon: IconType;
	title: string;
	name: string;
	target?: HTMLAttributeAnchorTarget;
};
export const menu_link = (role: Role): MenuActions[] | undefined => {
	switch (role) {
		case 'ADMIN':
			return [
				{
					id: uuid(),
					path: '/admin/orders',
					title: 'Заказы',
					icon: FaRegRectangleList,
					name: 'orders',
				},
				{
					id: uuid(),
					path: '/admin/products',
					title: 'Товары',
					icon: LiaRingSolid,
					name: 'products',
				},
				{
					id: uuid(),
					path: 'https://analytics.umami.is/share/9lahb1FmsCgHDYXh/vozduh',
					title: 'Посещения',
					icon: AiOutlineLineChart,
					name: 'some_ref',
					target: '_blank',
				},
			];
		case 'USER':
			return [
				{
					id: uuid(),
					path: '/profile/main',
					icon: LiaUserSolid,
					title: 'Профиль',
					name: 'main',
				},
				{
					id: uuid(),
					path: '/profile/favorites',
					icon: GoHeart,
					title: 'Избранное',
					name: 'favorites',
				},
				{
					id: uuid(),
					path: '/profile/settings',
					icon: SlSettings,
					title: 'Настройки',
					name: 'settings',
				},
			];
		default:
			break;
	}
};
