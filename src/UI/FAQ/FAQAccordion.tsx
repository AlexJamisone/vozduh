import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Stack,
	Text,
} from '@chakra-ui/react';
import type { FAQ } from '@prisma/client';

type FAQAccordionProps = {
	faq: FAQ;
};

const FAQAccordion = ({ faq }: FAQAccordionProps) => {
	const { title, content } = faq;
	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Box as="span" flex={1} textAlign="left">
						{title}
					</Box>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel as={Stack} gap={5}>
				{content.map((cont, index) => (
					<Text key={index}>{cont}</Text>
				))}
			</AccordionPanel>
		</AccordionItem>
	);
};

export default FAQAccordion;
