import { Link } from '@chakra-ui/next-js';
import { Box, Center, Icon, Stack } from '@chakra-ui/react';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React from 'react';
import ThemeButton from '~/components/ThemeButton';
import UserBtn from '~/components/UserBtn';
import { nav } from '~/constants/nav';
import Cart from '../Cart';

const Desktop = () => {
	return (
		<>
			<Center
				as="nav"
				justifyContent="center"
				alignItems="center"
				h={170}
				gap={28}
			>
				{nav.map(({ src, icon, title, isLogo }) => (
					<React.Fragment key={src}>
						{isLogo ? (
							<Box
								as={motion.div}
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										type: 'spring',
										duration: 0.2,
									},
								}}
							>
								<Link
									href={src}
									display="inline-block"
									h="100%"
								>
									<Icon as={icon} />
								</Link>
							</Box>
						) : (
							<Box
								as={motion.div}
								initial={{ opacity: 0 }}
								animate={{
									opacity: 1,
									transition: {
										type: 'spring',
										delay: 0.5,
									},
								}}
							>
								<Link
									_hover={{
										textDecoration: 'none',
										textColor: 'blue.500',
									}}
									href={src}
									transition="color .2s ease-in-out"
								>
									{title}
								</Link>
							</Box>
						)}
					</React.Fragment>
				))}
			</Center>
			<Stack
				position="absolute"
				right={16}
				direction="row"
				alignItems="center"
				gap={8}
				as={motion.div}
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: {
						type: 'spring',
						delay: 0.5,
					},
				}}
			>
				<Cart />
				<ThemeButton />
				<SignedIn>
					<UserBtn />
				</SignedIn>
				<SignedOut>
					<Link
						_hover={{
							textDecoration: 'none',
						}}
						href="/signin"
					>
						Вход
					</Link>
				</SignedOut>
			</Stack>
		</>
	);
};

export default Desktop;
