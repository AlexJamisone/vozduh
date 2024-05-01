import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { descriptionTheme } from './description_theme';
import { headeing_theme } from './headig_theme';

const config: ThemeConfig = {
	initialColorMode: 'system',
	disableTransitionOnChange: false,
	useSystemColorMode: true,
};
const components = {
	Heading: headeing_theme,
	Text: descriptionTheme,
};

export const theme = extendTheme({ config, components });
