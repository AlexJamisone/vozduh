import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { ruRU } from '@clerk/localizations';
import { ClerkProvider, SignedIn } from '@clerk/nextjs';
import '@uploadthing/react/styles.css';
import { type AppType } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import FAQButton from '~/UI/FAQ/FAQButton';
import Menu from '~/UI/Menu';
import Navigation from '~/UI/Navigation/Navigation';
import { theme } from '~/chakra/theme';
import { toastOption } from '~/chakra/toastOption';
import '~/styles/globals.css';
import { api } from '~/utils/api';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider theme={theme} toastOptions={toastOption}>
			<Script
				async
				src="https://analytics.umami.is/script.js"
				data-website-id="d4197f8c-599f-450c-b08b-eb616dec96af"
			/>
			<ColorModeScript initialColorMode={'system'} />
			<ClerkProvider localization={ruRU}>
				<Head>
					<title>Vozduh | Украшения из серебра</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Navigation />
				<SignedIn>
					<Menu />
				</SignedIn>
				<Component {...pageProps} />
				<FAQButton />
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
