import { Icon, IconButton, useColorMode } from '@chakra-ui/react';
import { CiDark, CiLight } from 'react-icons/ci';

const ThemeButton = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<IconButton
			variant="outline"
			aria-label="theme"
			onClick={toggleColorMode}
			icon={<Icon as={colorMode === 'dark' ? CiLight : CiDark} />}
		/>
	);
};

export default ThemeButton;
