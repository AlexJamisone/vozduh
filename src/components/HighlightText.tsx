import { Highlight } from '@chakra-ui/react';

type HighlightTextProps = {
	title: string;
};

const HighlightText = ({ title }: HighlightTextProps) => {
	return (
		<Highlight
			query={title}
			styles={{
				bgColor: 'green.200',
				p: 1,
				borderRadius: '2xl',
			}}
		>
			{title}
		</Highlight>
	);
};

export default HighlightText;
