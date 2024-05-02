import { Icon, IconButton, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { social } from '~/constants/social';
import FooterStar from './FooterStar';

export default function SocialMedia() {
	return (
		<Stack alignItems="center">
			<Stack direction={['column', 'row']} gap={5} alignItems="flex-end">
				{social.map(({ id, color, icon, url, title }) => (
					<Stack as={motion.div} key={id} position="relative">
						{title === 'Instagram' && (
							<Text
								as="span"
								position="absolute"
								right={-2}
								top={0}
								userSelect="none"
							>
								*
							</Text>
						)}
						<IconButton
							aria-label={title}
							variant="outline"
							isRound
							as={Link}
							href={url}
							target="_blank"
							w="36px"
							h="36px"
							size={'md'}
							p={[3, 5]}
							icon={
								<Icon
									as={icon}
									fontSize={['md', '2xl']}
									color="blackAlpha.700"
									_dark={{
										color: 'whiteAlpha.800',
									}}
								/>
							}
							_hover={{
								bgColor: color,
							}}
							transition="all .3s ease-in-out"
						/>
					</Stack>
				))}
			</Stack>
			<FooterStar />
		</Stack>
	);
}
