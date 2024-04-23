import { Icon, IconButton, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { GoPlus } from 'react-icons/go';
import { v4 as uuid } from 'uuid';
import {
	useAdditionalService,
	type AdditionalService,
} from '~/store/useAdditionalServise';
import AdditionalServiceHeader from './AdditionalServiceHeader';
import ServiceOptionStick from './ServiceOptionStick';

type AdditionalServiceCardProps = {
	service: AdditionalService;
};
export default function AdditionalServiceCard({
	service,
}: AdditionalServiceCardProps) {
	const { title, id, additionalOptions } = service;
	const addOption = useAdditionalService((state) => state.addOption);
	return (
		<Stack
			p={5}
			boxShadow="md"
			rounded="2xl"
			as={motion.div}
			layout
			initial={{ opacity: 0 }}
			animate={{
				opacity: 1,
				transition: {
					type: 'spring',
					stiffness: 150,
					mass: 0.5,
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
		>
			<AdditionalServiceHeader title={title} id={id} />
			{additionalOptions.map((opt) => (
				<ServiceOptionStick id={id} option={opt} key={opt.id} />
			))}
			<IconButton
				aria-label="add-opion"
				onClick={() =>
					addOption(id, { price: 0, name: '', id: uuid() })
				}
				colorScheme="green"
				icon={<Icon as={GoPlus} />}
				variant="outline"
			/>
		</Stack>
	);
}
