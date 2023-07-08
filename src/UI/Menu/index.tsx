import { Link } from '@chakra-ui/next-js';
import { Center, Icon, IconButton, Stack, Tooltip } from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import type { Role } from '@prisma/client';
import { motion } from 'framer-motion';
import { menu_link } from '~/constants/menu';
import { api } from '~/utils/api';

const Menu = () => {
	const { data: role } = api.user.getRole.useQuery();
	const { isSignedIn } = useAuth();
	if (!role) return null;
	return (
		<>
			{isSignedIn && (
				<Center
					justifyContent="center"
					position="fixed"
					bottom={0}
					w="100%"
				>
					<Stack
						as={motion.div}
						initial={{ opacity: 0, y: 50 }}
						animate={{
							opacity: 1,
							y: 0,
							transition: {
								duration: 0.5,
								type: 'spring',
							},
						}}
						direction="row"
						gap={7}
						bg="InfoBackground"
						py={3}
						px={7}
						roundedTop="2xl"
					>
						{menu_link(role as Role)?.map(
							({ id, icon, path, title }) => (
								<Tooltip key={id} label={title}>
									<IconButton
										as={Link}
										href={path}
										variant="outline"
										aria-label="menu-list"
										rounded="full"
										icon={<Icon as={icon} />}
									/>
								</Tooltip>
							)
						)}
					</Stack>
				</Center>
			)}
		</>
	);
};

export default Menu;
