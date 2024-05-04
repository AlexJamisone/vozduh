import { Text } from '@chakra-ui/react';

export default function FooterStar() {
	return (
		<Text
			as="span"
			variant="description"
			fontSize="x-small"
			maxH={200}
			textAlign={['right', null]}
		>
			* компания мета (и её продукты инстаграм и фейсбук) признана
			<br />
			экстремистской и запрещена на территории российской федерации
		</Text>
	);
}
