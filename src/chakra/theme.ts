import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const defultTheme: ThemeConfig = {
	initialColorMode: 'system',
	disableTransitionOnChange: true,
	useSystemColorMode: true,
};

export const theme = extendTheme({ defultTheme });
