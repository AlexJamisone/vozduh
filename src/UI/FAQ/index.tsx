import { Accordion } from '@chakra-ui/react';
import { api } from '~/utils/api';
import FAQAccordion from './FAQAccordion';

const FAQ = () => {
	const { data: faqs } = api.faq.get.useQuery();
	return (
		<Accordion w={500} allowMultiple defaultIndex={[0]}>
			{faqs?.map((faq) => (
				<FAQAccordion key={faq.id} faq={faq} />
			))}
		</Accordion>
	);
};

export default FAQ;
