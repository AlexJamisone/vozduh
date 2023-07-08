import { useColorMode } from '@chakra-ui/react';
import { UserProfile } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import AnimataedLayout from '~/components/AnumationLayout';
const UserSettings = () => {
	const { colorMode } = useColorMode();
	return (
		<AnimataedLayout
			container={{
				pt: 200,
			}}
		>
			<UserProfile
				appearance={{
					baseTheme: colorMode === 'dark' ? dark : undefined,
				}}
			/>
		</AnimataedLayout>
	);
};

export default UserSettings;
