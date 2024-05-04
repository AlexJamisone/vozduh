import { Stack, useColorMode, useMediaQuery } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import FooterCercl from './FooterCercl';
import FooterInfo from './FooterInfo';
import SocialMedia from './SocilMedia';
import { noice_animation } from './animation';

export default function Footer() {
	const animation = `${noice_animation} infinite 1s steps(2)`;
	const { isSignedIn } = useAuth();
	const [isLessThen480] = useMediaQuery('(max-width: 480px)', {
		ssr: true,
		fallback: true,
	});

	const { colorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	return (
		<Stack
			as="footer"
			p={[5, 10]}
			pb={[isSignedIn ? 90 : 5]}
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			position="relative"
			overflow="hidden"
			roundedTop={[null, '50px']}
			height={[isSignedIn ? 300 : 250, 175]}
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
			{!isLessThen480 && <FooterCercl />}
			{isLessThen480 && (
				<Stack justifyContent="space-between" height="100%">
					<FooterCercl />
					<FooterInfo />
				</Stack>
			)}
			<SocialMedia />
			{!isLessThen480 && <FooterInfo />}
		</Stack>
	);
}
