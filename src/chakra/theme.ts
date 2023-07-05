import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const defultTheme: ThemeConfig = {
	initialColorMode: 'system',
	disableTransitionOnChange: false,
	useSystemColorMode: true,
};

export const theme = extendTheme({ defultTheme });
