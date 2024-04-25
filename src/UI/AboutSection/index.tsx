import {
	Editable,
	EditableInput,
	EditablePreview,
	EditableTextarea,
	HStack,
	Icon,
	IconButton,
	SkeletonText,
	Stack,
	useEditableControls,
	useToast,
} from '@chakra-ui/react';
import { FaCheck } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import { useAbout } from '~/store/useAbout';
import { api } from '~/utils/api';

function EditableControls({
	value,
	id,
	type,
}: {
	value: string;
	id?: string;
	type: 'title' | 'content';
}) {
	const ctx = api.useContext();
	const clear = useAbout((state) => state.clear);
	const toast = useToast();
	const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
		useEditableControls();
	const { mutate: set, isLoading } = api.about.setAbout.useMutation({
		onSuccess: async (message) => {
			await ctx.about.invalidate();
			toast({
				description: message,
				status: !id ? 'success' : 'info',
			});
			clear();
		},
		onError: ({ data }) => {
			if (data?.zodError) {
				toast({
					description:
						'Поле не может быть пустым, изменения не сохранены',
					status: 'error',
				});
			}
		},
	});
	return (
		<>
			{isEditing && (
				<Stack direction="row">
					<IconButton
						aria-label="confirm"
						colorScheme="teal"
						icon={<Icon as={FaCheck} />}
						isLoading={isLoading}
						size="sm"
						{...getSubmitButtonProps({
							onClick: () => set({ id, value, type }),
						})}
					/>
					<IconButton
						aria-label="cancel"
						colorScheme="red"
						icon={<Icon as={RxCross2} />}
						size="sm"
						{...getCancelButtonProps({ onClick: clear })}
					/>
				</Stack>
			)}
		</>
	);
}
const AboutSection = () => {
	const { data: role } = api.user.getRole.useQuery();
	const { data: about, isLoading: isLoadingAbout } = api.about.get.useQuery();

	const [setInput, input] = useAbout((state) => [
		state.setInput,
		state.input,
	]);
	const isAdmin = role === 'ADMIN';
	if (isLoadingAbout)
		return (
			<Stack w={500}>
				<SkeletonText noOfLines={1} skeletonHeight={7} w={200} mb={5} />
				<SkeletonText noOfLines={15} skeletonHeight="2" spacing={5} />
			</Stack>
		);
	return (
		<Stack justifyContent="center" maxW={500} pb={100}>
			<Editable
				isPreviewFocusable={isAdmin}
				defaultValue={about?.title}
				placeholder="Заголовок (сейчас здесь пусто)"
			>
				<EditablePreview as="h1" fontSize="3xl" />
				<HStack>
					<EditableInput
						onChange={(e) => setInput({ title: e.target.value })}
						value={about?.title ?? input.title}
					/>
					{isAdmin && (
						<EditableControls
							value={input.title}
							id={about?.id}
							type="title"
						/>
					)}
				</HStack>
			</Editable>
			<Editable
				defaultValue={about?.content}
				placeholder="Контент (сейчас здесь пусто)"
				isPreviewFocusable={isAdmin}
			>
				<EditablePreview as="p" whiteSpace="pre-wrap" />
				<HStack>
					<EditableTextarea
						height="120px"
						w={500}
						onChange={(e) => setInput({ content: e.target.value })}
						value={about?.content ?? input.content}
					/>
					{isAdmin && (
						<EditableControls
							value={input.content}
							id={about?.id}
							type="content"
						/>
					)}
				</HStack>
			</Editable>
		</Stack>
	);
};

export default AboutSection;
