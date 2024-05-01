import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const description = defineStyle({
	fontFamily: "'Jost', sans-serif",
	fontSize: ['sm', 'md'],
	textColor: 'blackAlpha.700',
	whiteSpace: 'pre-wrap',
	textAlign: 'left',
	_dark: {
		textColor: 'whiteAlpha.800',
	},
});

export const descriptionTheme = defineStyleConfig({
	variants: { description },
});
