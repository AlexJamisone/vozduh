import {
	Divider,
	Icon,
	IconButton,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
	MdArrowBackIos,
	MdDelete,
	MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { CartItem, useCart } from '~/store/useCart';

type CartItemProps = {
	item: CartItem;
	index: number;
};
const CartItem = ({
	item: { name, id, size, price, img, quantity, additionalOptions },
	index,
}: CartItemProps) => {
	const [isLowerThan400] = useMediaQuery('(max-width: 400px)');
	const [remove, update] = useCart((state) => [state.remove, state.update]);
	return (
		<Stack
			as={motion.div}
			layout
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					type: 'spring',
					duration: 3 * index,
				},
			}}
			exit={{
				opacity: 0,
				transition: {
					type: 'spring',
					duration: 0.3,
				},
			}}
		>
			<Stack
				direction="row"
				alignItems="center"
				justifyContent="space-between"
				textAlign="center"
			>
				<Image
					alt={name}
					width={isLowerThan400 ? 39 : 50}
					height={isLowerThan400 ? 39 : 50}
					src={`https://utfs.io/f/${img}`}
					style={{
						objectFit: 'cover',
					}}
				/>
				<Stack gap={0.5}>
					<Text fontSize={['smaller', 'md']}>{name}</Text>
					<Stack textAlign="center" fontSize="small">
						<Text fontSize={['smaller']}>Размер: {size}</Text>
						{additionalOptions?.map(
							({ optionTitle, serviceTitle, price }, index) => (
								<Stack
									key={index + 1}
									direction="row"
									fontSize="smaller"
									justifyContent="center"
								>
									<Text>
										{serviceTitle} {optionTitle} · {price} ₽
									</Text>
								</Stack>
							)
						)}
					</Stack>
				</Stack>
				<Stack direction="row">
					<IconButton
						aria-label="minus"
						variant="ghost"
						icon={<Icon as={MdArrowBackIos} />}
						size={['xs', 'sm']}
						onClick={() =>
							update(id, size, quantity - 1, additionalOptions)
						}
					/>
					<Text>{quantity}</Text>
					<IconButton
						aria-label="plus"
						icon={<Icon as={MdOutlineArrowForwardIos} />}
						variant="ghost"
						onClick={() =>
							update(id, size, quantity + 1, additionalOptions)
						}
						size={['xs', 'sm']}
					/>
				</Stack>
				<Text fontSize={['smaller', 'md']}>{price} ₽</Text>
				<IconButton
					aria-label="remove"
					icon={<Icon as={MdDelete} />}
					colorScheme="red"
					size={['xs', 'sm']}
					onClick={() => remove(id, size, additionalOptions)}
				/>
			</Stack>
			<Divider />
		</Stack>
	);
};

export default CartItem;
