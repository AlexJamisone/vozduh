import { useColorMode } from '@chakra-ui/react';
import { SignIn } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Head from 'next/head';
import AnumationLayout from '~/components/AnumationLayout';

const SigInPage = () => {
	const { colorMode } = useColorMode();
	return (
		<AnumationLayout>
			<Head>
				<title>Vozduh | Вход</title>
			</Head>
			<SignIn
				appearance={{
					baseTheme: colorMode === 'dark' ? dark : undefined,
				}}
				signUpUrl="/signup"
				afterSignInUrl="/"
			/>
		</AnumationLayout>
	);
};

export default SigInPage;
