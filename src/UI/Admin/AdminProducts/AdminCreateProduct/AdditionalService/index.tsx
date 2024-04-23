import { Button, Stack } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { useAdditionalService } from '~/store/useAdditionalServise';
import AdditionalServiceCard from './AdditionalServiceCard';

const AdditionalService = () => {
	const serviceAvailability = useAdditionalService(
		(state) => state.additionalServices
	);
	const addService = useAdditionalService((state) => state.addService);
	return (
		<Stack>
			<AnimatePresence>
				{serviceAvailability.map((service) => (
					<AdditionalServiceCard service={service} key={service.id} />
				))}
			</AnimatePresence>
			<Button onClick={addService}>Добавить доп. сервис</Button>
		</Stack>
	);
};

export default AdditionalService;
