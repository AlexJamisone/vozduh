import { Accordion, Button, Stack, useDisclosure } from '@chakra-ui/react';
import { useReducer } from 'react';
import { aboutReducer, initialState } from '~/reducer/aboutReducer';
import { api } from '~/utils/api';
import FAQAccordion from './FAQAccordion';
import FAQModal from './FAQModal';

const FAQ = () => {
	const { data: faqs } = api.faq.get.useQuery();
	const { data: role } = api.user.getRole.useQuery();
	const { isOpen, onToggle, onClose } = useDisclosure();
	const [state, dispatch] = useReducer(aboutReducer, initialState);

	return (
		<Stack w={500}>
			<Accordion allowMultiple>
				{faqs?.map((faq) => (
					<FAQAccordion
						dispatch={dispatch}
						onToggle={onToggle}
						key={faq.id}
						faq={faq}
					/>
				))}
			</Accordion>
			{role === 'ADMIN' && (
				<Button onClick={onToggle} variant="outline">
					Создать F.A.Q.
				</Button>
			)}
			<FAQModal
				isOpen={isOpen}
				onClose={onClose}
				dispatch={dispatch}
				state={state}
			/>
		</Stack>
	);
};

export default FAQ;
