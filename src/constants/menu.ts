import type { Role } from '@prisma/client';
import type { HTMLAttributeAnchorTarget } from 'react';
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
	name: string;
	income?: {
		is: boolean;
		value?: number;
	};
	target?: HTMLAttributeAnchorTarget;
};

export const menu_link = (
	role: Role,
	value?: number
): MenuActions[] | undefined => {
	switch (role) {
		case 'ADMIN':
			return [
				{
					id: 1,
					path: '/admin/orders',
					title: 'Заказы',
					icon: FaRegRectangleList,
					name: 'orders',
					income: {
						is: true,
						value,
					},
				},
				{
					id: 2,
					path: '/admin/products',
					title: 'Товары',
					icon: LiaRingSolid,
					name: 'products',
				},
				{
					id: 3,
					path: process.env.NEXT_PUBLIC_ANALISTIC_URL as string,
					title: 'Посещения',
					icon: AiOutlineLineChart,
					name: 'some_ref',
					target: '_blank',
				},
			];
		case 'USER':
			return [
				{
					id: 4,
					path: '/profile/main',
					icon: LiaUserSolid,
					title: 'Профиль',
					name: 'main',
				},
				{
					id: 5,
					path: '/profile/favorites',
					icon: GoHeart,
					title: 'Избранное',
					name: 'favorites',
					income: {
						is: true,
						value,
					},
				},
				{
					id: 6,
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
