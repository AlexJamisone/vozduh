import { Button, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Category from '~/UI/Category';
import HeroHeading from '~/components/HeroHeding';
import { api } from '~/utils/api';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import Ring from '~/UI/3D';
import Footer from '~/UI/Footer';
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
	function handlScroll(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: 'smooth' });
		}
	}
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
						<HeroHeading categorys={categorys} />
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
			<Category />
			<Footer />
		</Stack>
	);
}
