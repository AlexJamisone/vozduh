import {
	Highlight,
	Stack,
	Text,
	type StackProps,
	type TextProps,
} from '@chakra-ui/react';

type HighlightPhraseProps = {
	title: string;
	text: string;
	textProps?: TextProps;
	containerProps?: StackProps;
};

const HighlightPhrase = ({
	text,
	title,
	textProps,
	containerProps,
}: HighlightPhraseProps) => {
	return (
		<Stack
			direction="row"
			alignItems="center"
			{...containerProps}
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
			<Text fontWeight={600} {...textProps}>
				{text}
			</Text>
		</Stack>
	);
};

export default HighlightPhrase;
