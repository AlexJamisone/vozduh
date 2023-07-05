import Logo from '~/assets/Logo';

type NavProps = {
	title?: string;
	src: string;
	icon?: () => JSX.Element;
	isLogo: boolean;
};

export const nav: NavProps[] = [
	{
		title: 'О нас',
		src: '/about',
		isLogo: false,
	},
	{
		src: '/',
		icon: Logo,
		isLogo: true,
	},
	{
		title: 'Магазины',
		src: '/offline',
		isLogo: false,
	},
];
