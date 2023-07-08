import { Link } from '@chakra-ui/next-js';
import { Box, Center, Icon, Stack } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import React from 'react';
import ThemeButton from '~/components/ThemeButton';
import UserBtn from '~/components/UserBtn';
import { nav } from '~/constants/nav';
import Cart from '../Cart/Cart';
const Desktop = () => {
	const { isSignedIn } = useAuth();
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
								initial={{ y: 400, scale: 1.5, opacity: 0 }}
								animate={{
									y: 0,
									scale: 1,
									opacity: 1,
									transition: {
										type: 'spring',
										duration: 3,
									},
								}}
							>
								<Link href={src}>
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
										delay: 3.1,
									},
								}}
							>
								<Link
									_hover={{
										textDecoration: 'none',
									}}
									href={src}
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
						delay: 3.1,
					},
				}}
			>
				<Cart />
				<ThemeButton />
				{isSignedIn ? (
					<UserBtn />
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
		</>
	);
};

export default Desktop;
