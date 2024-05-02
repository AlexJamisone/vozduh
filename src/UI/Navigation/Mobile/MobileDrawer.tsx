import { Link } from '@chakra-ui/next-js';
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerHeader,
	DrawerOverlay,
	Icon,
	IconButton,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import { useAuth } from '@clerk/nextjs';
import { AnimatePresence, motion } from 'framer-motion';
import { HiOutlineMenu } from 'react-icons/hi';
import DrawerContentComponent from '~/components/DrawerContentComponent';
import ThemeButton from '~/components/ThemeButton';
import UserBtn from '~/components/UserBtn';
import { nav } from '~/constants/nav';
import { slide } from './animation';

export default function MobileDrawer() {
	const { onToggle, isOpen, onClose } = useDisclosure();
	const { isSignedIn } = useAuth();
	return (
		<>
			<IconButton
				aria-label="menu-trigger"
				variant="outline"
				icon={<Icon as={HiOutlineMenu} />}
				onClick={onToggle}
			/>
			<AnimatePresence mode="wait">
				<Drawer isOpen={isOpen} onClose={onClose}>
					<DrawerOverlay />
					<DrawerContentComponent>
						<DrawerHeader>
							<Stack
								direction="row"
								justifyContent="space-between"
								alignItems="center"
							>
								<Text>Меню</Text>
								<ThemeButton />
								{isSignedIn ? (
									<Stack mr={12}>
										<UserBtn />
									</Stack>
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
								({ isLogo, src, title }, index) =>
									!isLogo && (
										<Stack
											as={motion.div}
											variants={slide}
											custom={index}
										>
											<Link
												href={src}
												key={src}
												onClick={onClose}
											>
												{title}
											</Link>
										</Stack>
									)
							)}
						</DrawerBody>
					</DrawerContentComponent>
				</Drawer>
			</AnimatePresence>
		</>
	);
}
