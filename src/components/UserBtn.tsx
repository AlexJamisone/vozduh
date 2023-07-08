import { useColorMode } from '@chakra-ui/react';
import { UserButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
const UserBtn = () => {
	const { colorMode } = useColorMode();
	return (
		<UserButton
			afterSignOutUrl="/"
			signInUrl="/signin"
			appearance={{
				baseTheme: colorMode === 'dark' ? dark : undefined,
			}}
		/>
	);
};

export default UserBtn;
