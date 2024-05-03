import { Button, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Category from '~/UI/Category';
import HeroHeading from '~/components/HeroHeding';

import type { Category as CategoryType } from '@prisma/client';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Ring from '~/UI/3D';
import Footer from '~/UI/Footer';
import { handlScroll } from '~/helpers/handlScroll';
import { prisma } from '~/server/db';

export const getStaticProps = (async () => {
	const categorys = await prisma.category.findMany({
		select: {
			title: true,
			id: true,
			image: true,
			path: true,
		},
	});
	return { props: { categorys } };
}) satisfies GetStaticProps<{
	categorys: CategoryType[];
}>;

export default function Home({
	categorys,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<Stack as={motion.main} initial={{ backgroundColor: 'Menu' }} gap={0}>
			<Ring />
			<Stack
				as="section"
				h="100vh"
				position="relative"
				justifyContent="center"
			>
				<Stack direction={['row']} justifyContent={['start']}>
					<Stack px={10} gap={3} mt={['150px', 0]} maxW={600}>
						<HeroHeading
							categorys={categorys.map((c) => c.title)}
						/>
						<Button
							variant="outline"
							colorScheme="blue"
							onClick={() => handlScroll('collection')}
							zIndex={20}
							width="100%"
							size={['sm', 'md']}
						>
							Смотреть коллекции
						</Button>
					</Stack>
				</Stack>
			</Stack>
			<Category categorys={categorys} />
			<Footer />
		</Stack>
	);
}
