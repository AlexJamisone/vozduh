import { SignUp } from '@clerk/nextjs';
import AnimataedLayout from '~/components/AnumationLayout';

const SignUpPage = () => {
	return (
		<AnimataedLayout
			container={{
				mt: 75,
			}}
		>
			<SignUp afterSignUpUrl="/" signInUrl="/signin" />
		</AnimataedLayout>
	);
};

export default SignUpPage;
