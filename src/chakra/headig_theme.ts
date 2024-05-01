import { defineStyleConfig } from '@chakra-ui/react';

export const headeing_theme = defineStyleConfig({
	baseStyle: {
		fontFamily: `"Geologica", sans-serif`,
		textColor: 'blackAlpha.800',
		fontWeight: 600,
		fontSize: ['xl', '4xl'],
		_dark: {
			textColor: 'whiteAlpha.700',
		},
	},
});
