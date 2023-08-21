import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ruRU } from '@clerk/localizations';
import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import { type AppType } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import AdminNotification from '~/UI/Admin/AdminNotification';
import FAQButton from '~/UI/FAQ/FAQButton';
import Menu from '~/UI/Menu';
import Navigation from '~/UI/Navigation/Navigation';
import { theme } from '~/chakra/theme';
import { CartProvider } from '~/context/cartContext';
import '~/styles/globals.css';
import { api } from '~/utils/api';

const MyApp: AppType = ({ Component, pageProps }) => {
	const { data: role } = api.user.getRole.useQuery();
	return (
		<ChakraProvider theme={theme}>
			<Script
				async
				src="https://analytics.umami.is/script.js"
				data-website-id="d4197f8c-599f-450c-b08b-eb616dec96af"
			/>
			<ColorModeScript initialColorMode={'system'} />
			<ClerkProvider localization={ruRU}>
				<CartProvider>
					<Head>
						<title>Vozduh | Украшения из серебра</title>
						<link rel="icon" href="/favicon.ico" />
					</Head>
					<Navigation />
					<SignedIn>
						{role === 'ADMIN' && <AdminNotification />}
						<Menu />
					</SignedIn>
					<Component {...pageProps} />
					<FAQButton />
				</CartProvider>
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
