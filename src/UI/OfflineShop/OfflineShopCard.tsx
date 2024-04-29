import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Highlight,
	Icon,
	IconButton,
	Image,
	Stack,
	Text,
	useToast,
	type SystemStyleObject,
} from '@chakra-ui/react';
import type { OfflineShop, Role } from '@prisma/client';
import type { TRPCError } from '@trpc/server';
import { motion } from 'framer-motion';
import { AiOutlineDelete } from 'react-icons/ai';
import { api } from '~/utils/api';

type OfflineShopCardProps = {
	shop: OfflineShop;
	role: Role | null | undefined | TRPCError;
	onToggle: () => void;
};
const styleHiglight: SystemStyleObject = {
	py: 0.5,
	px: 2,
	bgColor: 'green.300',
	rounded: '2xl',
};
const OfflineShopCard = ({ shop, role, onToggle }: OfflineShopCardProps) => {
	const { name, image, fullAddress, phone, work_time, id } = shop;
	const { mutate: deleteOfflineShop, isLoading: isLoadedDelet } =
		api.shop.delete.useMutation({
			onSuccess: () => {
				void ctx.shop.invalidate();
				toast({
					description: `Магазин ${name} успешно удален`,
					isClosable: true,
					duration: 2500,
				});
				onToggle();
			},
		});
	const ctx = api.useContext();
	const toast = useToast();
	function handlShop() {
		console.log('handl shop here');
	}
	return (
		<Card
			as={motion.div}
			layout
			initial={{ opacity: 0 }}
			whileInView={{
				opacity: 1,
				transition: {
					type: 'spring',
					duration: 0.3,
				},
			}}
			exit={{
				opacity: 0,
				transition: {
					type: 'spring',
					duration: 0.5,
				},
			}}
			size="sm"
			cursor={role === 'ADMIN' ? 'pointer' : 'default'}
			rounded="2xl"
			p={3}
			onClick={handlShop}
		>
			<CardHeader
				as={Stack}
				direction="row"
				textAlign="center"
				justifyContent="center"
				fontWeight={600}
				fontSize="lg"
				gap={3}
			>
				<Text>{name}</Text>
				{role === 'ADMIN' && (
					<IconButton
						variant="outline"
						size="sm"
						aria-label="delet"
						icon={<Icon as={AiOutlineDelete} />}
						colorScheme="red"
						onClick={(e) => {
							e.stopPropagation();
							deleteOfflineShop({
								id,
								image,
							});
						}}
						isLoading={isLoadedDelet}
					/>
				)}
			</CardHeader>
			<CardBody>
				<Image
					w={250}
					h={250}
					alt={name}
					src={`https://utfs.io/f/${image}`}
					objectFit="cover"
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
