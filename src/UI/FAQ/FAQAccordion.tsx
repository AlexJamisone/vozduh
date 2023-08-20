import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Icon,
	IconButton,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import type { FAQ } from '@prisma/client';
import { useReducer } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { aboutReducer, initialState } from '~/reducer/aboutReducer';
import { api } from '~/utils/api';
import FAQModal from './FAQModal';

type FAQAccordionProps = {
	faq: FAQ;
};

const FAQAccordion = ({ faq }: FAQAccordionProps) => {
	const { title, content } = faq;
	const { isOpen, onToggle, onClose } = useDisclosure();
	const [state, dispatch] = useReducer(aboutReducer, initialState);
	const { mutate: deleteFaq, isLoading } = api.faq.delete.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const handlButton = (
		operation: 'edit' | 'delet',
		action: () => void,
		isLoading?: boolean
	) => {
		return (
			<IconButton
				aria-label={operation}
				icon={
					<Icon
						as={operation === 'edit' ? CiEdit : AiOutlineDelete}
					/>
				}
				colorScheme={operation === 'edit' ? 'telegram' : 'red'}
				size="sm"
				variant="outline"
				onClick={(e) => {
					e.stopPropagation();
					action();
				}}
				isLoading={isLoading}
			/>
		);
	};
	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Box as="span" flex={1} textAlign="left">
						{title}
					</Box>
					<Stack direction="row" mr={10}>
						{handlButton('edit', () => {
							dispatch({
								type: 'SET_ABOUT',
								payload: {
									id: faq.id,
									content: faq.content.join('\n\n'),
									edit: true,
									title: faq.title,
								},
							});
							onToggle();
						})}
						{handlButton(
							'delet',
							() => {
								deleteFaq(
									{
										id: faq.id,
									},
									{
										onSuccess: () => {
											void ctx.faq.invalidate();
											toast({
												description: `FAQ: "${faq.title}" успешно удалён!`,
												status: 'loading',
												isClosable: true,
												position: 'top-right',
											});
										},
									}
								);
							},
							isLoading
						)}
					</Stack>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel as={Stack} gap={5}>
				{content.map((cont, index) => (
					<Text key={index}>{cont}</Text>
				))}
			</AccordionPanel>
			<FAQModal
				isOpen={isOpen}
				onClose={onClose}
				dispatch={dispatch}
				state={state}
			/>
		</AccordionItem>
	);
};

export default FAQAccordion;
