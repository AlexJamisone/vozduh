import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Highlight,
	Image,
	Stack,
	Text,
	type SystemStyleObject,
} from '@chakra-ui/react';
import type { OfflineShop, Role } from '@prisma/client';
import type { TRPCError } from '@trpc/server';

type OfflineShopCardProps = {
	shop: OfflineShop;
	role: Role | null | undefined | TRPCError;
};
const styleHiglight: SystemStyleObject = {
	py: 0.5,
	px: 2,
	bgColor: 'green.400',
	rounded: '2xl',
};
const OfflineShopCard = ({ shop, role }: OfflineShopCardProps) => {
	const { name, image, fullAddress, phone, work_time } = shop;
	return (
		<Card size="sm" cursor={role === 'ADMIN' ? 'pointer' : 'default'}>
			<CardHeader textAlign="center">{name}</CardHeader>
			<CardBody>
				<Image
					w={250}
					h={250}
					objectFit="scale-down"
					alt={name}
					src={`https://utfs.io/f/${image}`}
				/>
			</CardBody>
			<CardFooter
				flexDirection="column"
				textAlign="left"
				alignItems="flex-start"
				gap={3}
			>
				<Stack
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					<Highlight styles={styleHiglight} query="Адрес:">
						Адрес:
					</Highlight>
					<Text fontWeight={600}>{fullAddress}</Text>
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
