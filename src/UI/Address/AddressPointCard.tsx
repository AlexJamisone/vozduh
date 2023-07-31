import {
	Button,
	Card,
	CardBody,
	Stack,
	Text,
	useColorMode,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import HighlightText from '~/components/HighlightText';
import { useCreateAddressContext } from '~/context/addressContext';

const AddressPointCard = () => {
	const { address, dispatchAddress } = useCreateAddressContext();
	const { colorMode } = useColorMode();
	return (
		<AnimatePresence>
			{address.point.isPointSelect && (
				<Card
					as={motion.div}
					initial={{ opacity: 0, y: 50 }}
					layout
					animate={{
						opacity: 1,
						y: 0,
						transition: {
							type: 'spring',
							duration: 0.4,
						},
					}}
					mt="30px"
					boxShadow={
						colorMode === 'dark' ? '0 0 10px 0 white' : '2xl'
					}
					border={address.confirmPoint ? '1px solid' : undefined}
					borderColor={address.confirmPoint ? 'green.400' : undefined}
				>
					<CardBody
						fontWeight={600}
						fontSize={12}
						display="flex"
						gap={5}
						flexDirection="column"
					>
						<Stack direction="row" alignItems="end" gap={3}>
							<Text>
								<HighlightText title="ПВЗ:" />{' '}
								{address.point.selected?.name}
							</Text>
							<Button
								size="sm"
								onClick={() => {
									dispatchAddress({
										type: 'SET_ALL',
										payload: {
											...address,
											confirmPoint: !address.confirmPoint,
											map: !address.map,
											errorConfirm: false,
										},
									});
								}}
								border={
									address.errorConfirm
										? '1px solid'
										: undefined
								}
								borderColor={
									address.errorConfirm
										? 'orange.300'
										: undefined
								}
							>
								{address.confirmPoint
									? 'Изменить'
									: 'Подтвердить'}
							</Button>
						</Stack>
						<Text>
							<HighlightText title="Адрес:" />{' '}
							{address.point.selected?.addressName}
						</Text>
						<Text>
							<HighlightText title="Режим работы:" />{' '}
							{address.point.selected?.work_time}
						</Text>
						<Text>
							<HighlightText title="Телефон:" />{' '}
							{address.point.selected?.phone}
						</Text>
					</CardBody>
				</Card>
			)}
		</AnimatePresence>
	);
};

export default AddressPointCard;
