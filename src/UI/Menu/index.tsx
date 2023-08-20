import { Link } from '@chakra-ui/next-js';
import {
	Center,
	Icon,
	IconButton,
	Stack,
	Tooltip,
	useColorMode,
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import type { Role } from '@prisma/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { menu_link } from '~/constants/menu';
import { counterElement } from '~/helpers/counterElement';
import { api } from '~/utils/api';

const Menu = () => {
	const { data: role } = api.user.getRole.useQuery();
	const { data: ordersIncome } = api.order.getIncomeOrder.useQuery();
	const { data: favoritesCount } = api.favorites.countOfFavorites.useQuery();
	const { query } = useRouter();
	const { path: qpath } = query;
	const { isSignedIn } = useAuth();
	const { colorMode } = useColorMode();
	if (!role) return null;
	return (
		<Center as="aside">
			{isSignedIn && (
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
					position="fixed"
					bottom={0}
					direction="row"
					gap={7}
					bg="Menu"
					py={3}
					px={7}
					roundedTop="2xl"
					boxShadow={colorMode === 'dark' ? 'dark-lg' : '2xl'}
					justifyContent={['space-between', null, null]}
					w={['100%', 'unset', null]}
					zIndex={100}
				>
					{menu_link(
						role as Role,
						role === 'ADMIN'
							? ordersIncome
							: (favoritesCount as number)
					)?.map(({ id, icon, path, title, name, income }) => (
						<Stack key={id} position="relative">
							<Tooltip label={title}>
								<IconButton
									as={Link}
									isActive={name === qpath}
									boxShadow={
										colorMode === 'dark' && name === qpath
											? '0 0 10px 0 white'
											: name === qpath
											? '0 0 10px 0 black'
											: undefined
									}
									href={path}
									variant="outline"
									aria-label="menu-list"
									rounded="full"
									icon={<Icon as={icon} />}
									{...(income?.is &&
										counterElement(income.value as number, {
											bottom: -3,
											right: -5,
										}))}
								/>
							</Tooltip>
						</Stack>
					))}
				</Stack>
			)}
		</Center>
	);
};

export default Menu;
