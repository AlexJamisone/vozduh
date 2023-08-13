import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Highlight,
	Image,
	Skeleton,
	Stack,
	Text,
	type SystemStyleObject,
} from '@chakra-ui/react';
import type { OfflineShop, Role } from '@prisma/client';
import type { TRPCError } from '@trpc/server';
import { useOfflineShopContext } from '~/context/offlineShopContext';

type OfflineShopCardProps = {
	shop: OfflineShop;
	role: Role | null | undefined | TRPCError;
	isLoading: boolean;
	onToggle: () => void;
};
const styleHiglight: SystemStyleObject = {
	py: 0.5,
	px: 2,
	bgColor: 'green.400',
	rounded: '2xl',
};
const OfflineShopCard = ({
	shop,
	role,
	isLoading,
	onToggle,
}: OfflineShopCardProps) => {
	const { name, image, fullAddress, phone, work_time } = shop;
	const { dispatch } = useOfflineShopContext();
	return (
		<Card
			as={Skeleton}
			isLoaded={!isLoading}
			size="sm"
			cursor={role === 'ADMIN' ? 'pointer' : 'default'}
			rounded="2xl"
			p={3}
			onClick={() => {
				if (role === 'ADMIN') {
					dispatch({
						type: 'SET_SHOP',
						payload: {
							fullAddress: shop.fullAddress,
							id: shop.id,
							image: shop.image,
							name: shop.name,
							phone: shop.phone,
							shopEdit: true,
							work_time: shop.work_time ?? '',
						},
					});
					onToggle();
				}
			}}
		>
			<CardHeader textAlign="center" fontWeight={600} fontSize="lg">
				{name}
			</CardHeader>
			<CardBody>
				<Image
					w={250}
					h={250}
					alt={name}
					src={`https://utfs.io/f/${image}`}
				/>
			</CardBody>
			<CardFooter
				flexDirection="column"
				textAlign="left"
				alignItems="flex-start"
				gap={3}
				fontSize="sm"
			>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
					flexWrap="wrap"
				>
					<Highlight styles={styleHiglight} query="Адрес:">
						Адрес:
					</Highlight>
					<Text maxW={175} fontWeight={600}>
						{fullAddress}
					</Text>
				</Stack>
				<Stack direction="row" justifyContent="center">
					<Highlight styles={styleHiglight} query="Телефон:">
						Телефон:
					</Highlight>
					<Text fontWeight={600}>{phone}</Text>
				</Stack>
				{work_time && (
					<Stack justifyContent="center" direction="row">
						<Highlight
							styles={styleHiglight}
							query="График работы:"
						>
							График работы:
						</Highlight>
						<Text fontWeight={600}>{work_time}</Text>
					</Stack>
				)}
			</CardFooter>
		</Card>
	);
};

export default OfflineShopCard;
