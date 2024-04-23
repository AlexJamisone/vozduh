import {
	Card,
	CardBody,
	CardHeader,
	Icon,
	IconButton,
	Stack,
	Tag,
	Text,
	chakra,
	useToast,
} from '@chakra-ui/react';
import type {
	AdditionalService,
	AdditionalServiceOption,
	Product,
	Role,
	Size,
} from '@prisma/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BsArchive } from 'react-icons/bs';
import Overlay from '~/components/Overlay';
import { useAdditionalService } from '~/store/useAdditionalServise';
import { useCreateProduct } from '~/store/useCreateProduct';
import { api } from '~/utils/api';
import ProductCardImg from './ProductCardImg';

export type AdditionalServiceWithOption = AdditionalService & {
	additionalServicesOption: AdditionalServiceOption[];
};

type ProductCardProps = {
	product: Product & {
		size: Size[];
		additionalServices: AdditionalServiceWithOption[];
	};
	role?: Role;
	index: number;
};

const ProductCard = ({ product, role, index }: ProductCardProps) => {
	const { mutate: archive, isLoading } = api.product.archive.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const CardContainer = chakra(motion.div);
	const setProd = useCreateProduct((state) => state.setAll);
	const setServ = useAdditionalService((state) => state.setAll);

	const handlClickOnCard = () => {
		setProd({
			edit: { id: product.id, isEdit: true },
			image: product.image,
			size: product.size.map((s) => s.value),
			input: {
				name: product.name,
				price: product.price,
				description: product.description ?? '',
			},
			tab: 1,
			category: product.categoryTitle ?? '',
		});
		setServ({
			additionalServices: product.additionalServices.map((serv) => ({
				id: serv.id,
				title: serv.title,
				additionalOptions: serv.additionalServicesOption,
			})),
		});
	};
	return (
		<CardContainer
			layout
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					type: 'spring',
					delay: 0.2 * index,
				},
			}}
			cursor="pointer"
		>
			<Card
				onClick={role === 'ADMIN' ? handlClickOnCard : undefined}
				as={role === 'USER' || !role ? Link : undefined}
				href={`/product/${product.id}`}
				size={['sm', null, null, 'md']}
				fontWeight={600}
				textAlign="center"
				rounded="2xl"
			>
				{product.archived && <Overlay />}
				<CardHeader position="relative">
					<ProductCardImg images={product.image} />
				</CardHeader>
				<CardBody position="relative">
					<Stack gap={5} alignItems="center">
						<Text>{product.name}</Text>
						{role === 'ADMIN' && <Tag>{product.categoryTitle}</Tag>}
						<Text>{product.price} ₽</Text>
					</Stack>
					{role === 'ADMIN' && (
						<IconButton
							size={['xs', 'sm']}
							colorScheme="telegram"
							icon={<Icon as={BsArchive} />}
							variant="solid"
							aria-label="archive"
							position="absolute"
							zIndex={25}
							right={3}
							bottom={3}
							isLoading={isLoading}
							onClick={() =>
								archive(
									{
										archive: !product.archived,
										id: product.id,
									},
									{
										onSuccess: () => {
											void ctx.product.invalidate();
											toast({
												description: `Товар ${
													product.name
												} успешно ${
													product.archived
														? 'разархивирован'
														: 'архивирован'
												}`,
												status: product.archived
													? 'loading'
													: 'info',
											});
										},
									}
								)
							}
						/>
					)}
				</CardBody>
			</Card>
		</CardContainer>
	);
};

export default ProductCard;
