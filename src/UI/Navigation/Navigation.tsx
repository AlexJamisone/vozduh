import { Link } from '@chakra-ui/next-js';
import { Center, Icon, Stack } from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import React from 'react';
import { nav } from '~/constants/nav';

const Navigation = () => {
	const { isSignedIn } = useAuth();
	return (
		<Stack
			as="header"
			direction="row"
			alignItems="center"
			justifyContent="center"
			position="relative"
		>
			<Center
				as="nav"
				justifyContent="center"
				alignItems="center"
				h={150}
				gap={28}
			>
				{nav.map(({ src, icon, title, isLogo }) => (
					<React.Fragment key={src}>
						{isLogo ? (
							<Link href={src}>
								<Icon as={icon} />
							</Link>
						) : (
							<Link
								_hover={{
									textDecoration: 'none',
								}}
								href={src}
							>
								{title}
							</Link>
						)}
					</React.Fragment>
				))}
			</Center>
			<Stack position="absolute" right={16}>
				{isSignedIn ? (
					<UserButton />
				) : (
					<Link
						_hover={{
							textDecoration: 'none',
						}}
						href="/signin"
					>
						Вход
					</Link>
				)}
			</Stack>
		</Stack>
	);
};

export default Navigation;
