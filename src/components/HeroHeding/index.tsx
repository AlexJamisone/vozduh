import { Heading, Text } from '@chakra-ui/react';
import { TextLoop } from 'easy-react-text-loop';

export default function HeroHeding({ categorys }: { categorys: string[] }) {
	return (
		<Heading as="h1" maxW={600} textAlign="left">
			Создаем уникальные{' '}
			<TextLoop timeout={1500} animation="keyframes">
				{categorys.map((t) => (
					<Text as="span" textColor="blue.500" key={t}>
						{t.toLowerCase()}
					</Text>
				))}
			</TextLoop>
			<br />
			с 2019 года
			<br />
			ваш идеальный стиль в каждой детали.
		</Heading>
	);
}
