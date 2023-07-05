import { Link } from '@chakra-ui/next-js';
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	IconButton,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { UserButton, useAuth } from '@clerk/nextjs';
import { HiOutlineMenu } from 'react-icons/hi';
import Logo from '~/assets/Logo';
import ThemeButton from '~/components/ThemeButton';
import { nav } from '~/constants/nav';

const Mobile = () => {
	const { isSignedIn } = useAuth();
	const { isOpen, onClose, onToggle } = useDisclosure();
	return (
		<Stack
			as="nav"
			direction="row"
			alignItems="center"
			gap={16}
			justifyContent="center"
		>
			<Link href="/">
				<Logo />
			</Link>
			<IconButton
				aria-label="menu-trigger"
				variant="outline"
				icon={<Icon as={HiOutlineMenu} />}
				onClick={onToggle}
			/>
			<Drawer isOpen={isOpen} onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader>
						<Stack
							direction="row"
							justifyContent="space-between"
							alignItems="center"
						>
							<Text>Меню</Text>
							<ThemeButton />
							{isSignedIn ? (
								<UserButton />
							) : (
								<Link
									href="/signin"
									onClick={onClose}
									_hover={{ textDecoration: 'none' }}
									py={2}
									px={4}
									fontSize={12}
									border={'1px solid'}
									borderColor="gray.400"
									rounded="2xl"
									mr={9}
								>
									Войти
								</Link>
							)}
						</Stack>
					</DrawerHeader>
					<DrawerCloseButton />
					<DrawerBody as={Stack}>
						{nav.map(
							({ isLogo, src, title }) =>
								!isLogo && (
									<Link href={src} key={src}>
										{title}
									</Link>
								)
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</Stack>
	);
};

export default Mobile;
