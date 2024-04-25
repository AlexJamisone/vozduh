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
	useToast,
} from '@chakra-ui/react';
import type { FAQ } from '@prisma/client';
import { AiOutlineDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { useFaq } from '~/store/useFaq';
import { api } from '~/utils/api';

type FAQAccordionProps = {
	faq: FAQ;
	onToggle: () => void;
};

const FAQAccordion = ({ faq, onToggle }: FAQAccordionProps) => {
	const { title, content } = faq;
	const { mutate: deleteFaq, isLoading } = api.faq.delete.useMutation({
		onSuccess: () => {
			void ctx.faq.invalidate();
			toast({
				description: `FAQ: "${faq.title}" успешно удалён!`,
				status: 'loading',
			});
		},
	});
	const { data: role } = api.user.getRole.useQuery();
	const ctx = api.useContext();
	const toast = useToast();
	const setAll = useFaq((state) => state.setAll);
	const handlButton = (
		operation: 'edit' | 'delet',
		action: () => void,
		isLoading?: boolean
	) => {
		return (
			<>
				{role === 'ADMIN' && (
					<IconButton
						aria-label={operation}
						icon={
							<Icon
								as={
									operation === 'edit'
										? CiEdit
										: AiOutlineDelete
								}
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
				)}
			</>
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
							setAll({
								edit: { id: faq.id, is: true },
								input: { title, content },
							});
							onToggle();
						})}
						{handlButton(
							'delet',
							() => {
								deleteFaq({
									id: faq.id,
								});
							},
							isLoading
						)}
					</Stack>
					<AccordionIcon />
				</AccordionButton>
			</h2>
			<AccordionPanel as={Stack} gap={5}>
				<Text whiteSpace="pre-wrap">{content}</Text>
			</AccordionPanel>
		</AccordionItem>
	);
};

export default FAQAccordion;
