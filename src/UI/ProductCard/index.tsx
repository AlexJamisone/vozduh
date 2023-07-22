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
	ProductPriceHistory,
	Role,
	Size,
} from '@prisma/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import type { Dispatch, ReactNode } from 'react';
import { BsArchive } from 'react-icons/bs';
import Overlay from '~/components/Overlay';
import ProductCardContext from '~/context/productCardContext';
import type { Action, ProductState } from '~/reducer/productReducer';
import { api } from '~/utils/api';
import ProductCardImg from './ProductCardImg';

export type AdditionalServiceWithOption = AdditionalService & {
	additionalServicesOption: AdditionalServiceOption[];
};

type ProductCardProps = {
	product: Product & {
		priceHistory: ProductPriceHistory[];
		size: Size[];
		additionalServices: AdditionalServiceWithOption[];
	};
	role?: Role;
	image?: ReactNode;
	index: number;
	dispatch?: Dispatch<Action>;
	state?: ProductState;
};

const ProductCard = ({
	product,
	role,
	index,
	image,
	dispatch,
	state,
}: ProductCardProps) => {
	const { mutate: archive, isLoading } = api.product.archive.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const CardContainer = chakra(motion.div);

	const handlClickOnCard = () => {
		if (role === 'ADMIN' && dispatch !== undefined && state !== undefined) {
			dispatch({
				type: 'INCOME_SERVICE',
				payload: product.additionalServices.map((service) => ({
					id: service.id,
					title: service.title,
					additionalOptions: service.additionalServicesOption,
				})),
			});
			product.size.map((size) =>
				dispatch({ type: 'SET_PRODUCT_SIZE', payload: [size.id] })
			);
			dispatch({
				type: 'SET_PRODUCT',
				payload: {
					id: product.id,
					name: product.name,
					category: product.categoryTitle as string,
					description: product.description,
					image: product.image,
					price: product.priceHistory[0]?.price.toString() as string,
					size: state.product.size,
					serviceAvailability: state.product.serviceAvailability,
				},
			});
			dispatch({
				type: 'SET_VIEW',
				payload: {
					editProduct: true,
					category: false,
					editCategory: false,
					editSize: false,
					product: false,
					size: false,
				},
			});
		}
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
			onClick={role === 'ADMIN' ? handlClickOnCard : undefined}
			cursor="pointer"
		>
			<Card
				as={role === 'USER' || !role ? Link : undefined}
				href={`/product/${product.id}`}
				size={['sm', null, null, 'md']}
				fontWeight={600}
				textAlign="center"
				rounded="2xl"
			>
				{product.archived && <Overlay />}
				<ProductCardContext.Provider
					value={{
						product,
					}}
				>
					<CardHeader position="relative">{image}</CardHeader>
					<CardBody position="relative">
						<Stack gap={5} alignItems="center">
							<Text>{product.name}</Text>
							{role === 'ADMIN' && (
								<Tag>{product.categoryTitle}</Tag>
							)}
							<Text>{product.priceHistory[0]?.price} ₽</Text>
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
													isClosable: true,
													position: 'top-right',
												});
											},
										}
									)
								}
							/>
						)}
					</CardBody>
				</ProductCardContext.Provider>
			</Card>
		</CardContainer>
	);
};

ProductCard.Image = ProductCardImg;

export default ProductCard;
