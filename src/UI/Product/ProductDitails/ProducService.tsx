import { FormLabel, Select, Stack } from '@chakra-ui/react';
import { ChangeEvent } from 'react';
import { useProductDitails } from '~/store/useProductDitails';
type ProducServiceProp = {
	service: {
		id: string;
		title: string;
		additionalServicesOption: {
			id: string;
			name: string;
			price: number;
		}[];
	};
};

export default function ProducService({ service }: ProducServiceProp) {
	const set = useProductDitails((state) => state.setService);
	const { title, id, additionalServicesOption } = service;
	function handlChangeOption(e: ChangeEvent<HTMLSelectElement>) {
		const option = e.target.value.split(',');
		const optionId = option[0] ?? '';
		const price = Number(option[2] ?? 0);
		const optionTitle = option[1] ?? '';
		set({
			title,
			serviceId: id,
			optionId,
			price,
			optionTitle,
		});
	}
	return (
		<Stack gap={1}>
			<FormLabel fontWeight={600} htmlFor={id}>
				{title}
			</FormLabel>
			<Select placeholder="Стандарт" onChange={handlChangeOption} id={id}>
				{additionalServicesOption.map(({ id, name, price }) => (
					<option key={id} value={`${id},${name},${price}`}>
						{name} {price} ₽
					</option>
				))}
			</Select>
		</Stack>
	);
}
