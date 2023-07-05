import { useColorMode } from '@chakra-ui/react';
import { SignUp } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import AnimataedLayout from '~/components/AnumationLayout';

const SignUpPage = () => {
	const { colorMode } = useColorMode();
	return (
		<AnimataedLayout
			container={{
				mt: 75,
			}}
		>
			<SignUp
				appearance={{
					baseTheme: colorMode === 'dark' ? dark : undefined,
				}}
				afterSignUpUrl="/"
				signInUrl="/signin"
			/>
		</AnimataedLayout>
	);
};

export default SignUpPage;
