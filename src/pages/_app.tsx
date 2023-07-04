import { ChakraProvider } from '@chakra-ui/react';
import { ClerkProvider } from '@clerk/nextjs';
import { type AppType } from 'next/app';
import '~/styles/globals.css';
import { api } from '~/utils/api';

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<ChakraProvider>
			<ClerkProvider>
				<Component {...pageProps} />
			</ClerkProvider>
		</ChakraProvider>
	);
};

export default api.withTRPC(MyApp);
