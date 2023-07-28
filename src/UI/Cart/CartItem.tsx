import { Image } from '@chakra-ui/next-js';
import {
	Divider,
	Icon,
	IconButton,
	Stack,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { AiFillDelete } from 'react-icons/ai';
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { useCart } from '~/context/cartContext';
import { CartItem } from '~/reducer/cartReducer';

type CartItemProps = {
	item: CartItem;
	index: number;
};
const CartItem = ({ item, index }: CartItemProps) => {
	const { dispatchCart } = useCart();
	const [isLowerThan400] = useMediaQuery('(max-width: 400px)');
	const {
		image: src,
		name,
		quantity,
		price,
		id,
		size,
		additionalOptions,
	} = item;
	const handlButton = (operation: 'minus' | 'plus' | 'remove') => {
		return (
			<IconButton
				aria-label={operation}
				colorScheme={operation === 'remove' ? 'red' : undefined}
				size={operation === 'remove' ? 'md' : 'xs'}
				variant="ghost"
				icon={
					<Icon
						as={
							operation === 'minus'
								? MdOutlineKeyboardArrowLeft
								: operation === 'plus'
								? MdOutlineKeyboardArrowRight
								: AiFillDelete
						}
					/>
				}
				onClick={() => {
					if (
						(quantity === 1 && operation === 'minus') ||
						operation === 'remove'
					) {
						dispatchCart({
							type: 'REMOVE',
							payload: {
								id,
								sizeId: size.id,
								additionalOptions,
							},
						});
					} else {
						if (operation === 'minus') {
							dispatchCart({
								type: 'UPDATE',
								payload: {
									...item,
									quantity: quantity - 1,
								},
							});
						} else {
							dispatchCart({
								type: 'UPDATE',
								payload: {
									...item,
									quantity: quantity + 1,
								},
							});
						}
					}
				}}
			/>
		);
	};
	return (
		<Stack
			as={motion.div}
			layout
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					type: 'spring',
					duration: 0.1 * index,
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
					src={`https://utfs.io/f/${src}`}
				/>
				<Stack gap={0.5}>
					<Text fontSize={['smaller', 'md']}>{name}</Text>
					<Stack textAlign="center" fontSize="small">
						<Text fontSize={['smaller']}>Размер: {size.value}</Text>
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
					{handlButton('minus')}
					<Text>{quantity}</Text>
					{handlButton('plus')}
				</Stack>
				<Text fontSize={['smaller', 'md']}>{price} ₽</Text>
				{handlButton('remove')}
			</Stack>
			<Divider />
		</Stack>
	);
};

export default CartItem;
