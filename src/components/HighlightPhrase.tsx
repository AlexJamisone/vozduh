import { Highlight, Stack, Text } from '@chakra-ui/react';

type HighlightPhraseProps = {
	title: string;
	text: string;
};

const HighlightPhrase = ({ text, title }: HighlightPhraseProps) => {
	return (
		<Stack
			direction="row"
			alignItems="center"
			textAlign="left"
			fontSize="small"
		>
			<Highlight
				styles={{
					bgColor: 'green.200',
					py: 0.5,
					px: 1.5,
					borderRadius: '2xl',
				}}
				query={title}
			>
				{title}
			</Highlight>
			<Text fontWeight={600}>{text}</Text>
		</Stack>
	);
};

export default HighlightPhrase;
