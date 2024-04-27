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
import { useAddress } from '~/store/useAddress';

const AddressPointCard = () => {
	const { colorMode } = useColorMode();
	const [controller, point, setCtrl] = useAddress((state) => [
		state.controller,
		state.point,
		state.setController,
		state.setPoint,
	]);
	const handlPvz = () => {
		setCtrl({ isSelected: true, showMap: false });
	};
	return (
		<AnimatePresence>
			{controller.showPVZ && (
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
					border={point?.selected ? '1px solid' : undefined}
					borderColor={point?.selected ? 'green.400' : undefined}
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
								{point?.selected?.name}
							</Text>
							<Button size="sm" onClick={handlPvz}>
								{controller.isSelected
									? 'Изменить'
									: 'Подтвердить'}
							</Button>
						</Stack>
						<Text>
							<HighlightText title="Адрес:" />{' '}
							{point?.selected?.addressName}
						</Text>
						<Text>
							<HighlightText title="Режим работы:" />{' '}
							{point?.selected?.work_time}
						</Text>
						<Text>
							<HighlightText title="Телефон:" />{' '}
							{point?.selected?.phone}
						</Text>
					</CardBody>
				</Card>
			)}
		</AnimatePresence>
	);
};

export default AddressPointCard;
