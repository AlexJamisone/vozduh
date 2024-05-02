import type { IconType } from 'react-icons';
import { LiaInstagram, LiaTelegramPlane } from 'react-icons/lia';
import { SlSocialVkontakte } from 'react-icons/sl';
import { v4 as uuid } from 'uuid';

type SocialItem = {
	id: string;
	title: 'Telegram' | 'Instagram' | 'Vk';
	icon: IconType;
	url: string;
	color: string;
};
export const social: SocialItem[] = [
	{
		id: uuid(),
		title: 'Telegram',
		icon: LiaTelegramPlane,
		url: 'https://t.me/vozduh_jewelry',
		color: 'telegram.400',
	},
	{
		id: uuid(),
		title: 'Instagram',
		icon: LiaInstagram,
		url: 'https://www.instagram.com/vozduh.crimea/',
		color: 'whiteAlpha.300',
	},
	{
		id: uuid(),
		title: 'Vk',
		icon: SlSocialVkontakte,
		url: 'https://vk.com/vozduh.crimea',
		color: 'blue.500',
	},
];
