import { Box, Stack, useColorMode } from '@chakra-ui/react';
import FooterInfo from './FooterInfo';
import SocialMedia from './SocilMedia';
import { noice_animation } from './animation';

export default function Footer() {
	const animation = `${noice_animation} infinite 1s steps(2)`;
	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	return (
		<Stack
			as="footer"
			p={10}
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			position="relative"
			overflow="hidden"
			roundedTop="50px"
			height={[250, 175]}
			boxShadow={isDark ? undefined : 'dark-lg'}
			_after={{
				content: `""`,
				position: 'absolute',
				width: 'calc(100% + 20rem)',
				height: 'calc(100% + 20rem)',
				pointerEvents: 'none',
				bgImage: isDark ? 'url(/assets/noise.png)' : undefined,
				opacity: 0.65,
				left: '-10rem',
				top: '-10rem',
				roundedTop: '50px',
				animation: isDark ? animation : undefined,
			}}
		>
			<Box
				border="0.5px solid"
				width="67px"
				height="67px"
				rounded="full"
				borderColor="whiteAlpha.500"
			/>
			<SocialMedia />
			<FooterInfo />
		</Stack>
	);
}
