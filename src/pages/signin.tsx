import { SignIn } from '@clerk/nextjs';
import Head from 'next/head';
import AnumationLayout from '~/components/AnumationLayout';

const SigInPage = () => {
	return (
		<AnumationLayout
			container={{
				mt: [15, 75],
			}}
		>
			<Head>
				<title>Vozduh | Вход</title>
			</Head>
			<SignIn signUpUrl="/signup" afterSignInUrl="/" />
		</AnumationLayout>
	);
};

export default SigInPage;
