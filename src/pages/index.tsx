import { Button, Center, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Category from '~/UI/Category';
import HeroHeading from '~/components/HeroHeding';
import { api } from '~/utils/api';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Ring from '~/UI/3D';
import { prisma } from '~/server/db';

export const getStaticProps = (async () => {
	const res = await prisma.category.findMany({
		select: {
			title: true,
		},
	});
	const categorys = res.flatMap((i) => i.title);
	return { props: { categorys } };
}) satisfies GetStaticProps<{
	categorys: string[];
}>;

export default function Home({
	categorys,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	api.user.get.useQuery();
	return (
		<Stack
			as={motion.main}
			initial={{ backgroundColor: 'Menu' }}
			gap={0}
			pb={75}
		>
			<Center as="section" h="100vh" position="relative">
				<Stack direction="row">
					<Stack justifyContent="center">
						<HeroHeading categorys={categorys} />
						<Button variant="outline" colorScheme="blue">
							Смотреть колекции
						</Button>
					</Stack>
					<Ring />
				</Stack>
			</Center>
			<Category />
		</Stack>
	);
}
