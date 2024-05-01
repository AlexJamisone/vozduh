import { Heading, Stack, Text } from '@chakra-ui/react';
import { TextLoop } from 'easy-react-text-loop';

export default function HeroHeding({ categorys }: { categorys: string[] }) {
	return (
		<Heading as="h1">
			Создаем уникальные
			<Stack>
				<TextLoop timeout={1500} animation="keyframes">
					{categorys.map((t) => (
						<Text as="span" textColor="blue.500" key={t}>
							{t.toLowerCase()}
						</Text>
					))}
				</TextLoop>
			</Stack>
			<br />
			с 2019 года
			<br />
			ваш идеальный стиль в каждой детали.
		</Heading>
	);
}
