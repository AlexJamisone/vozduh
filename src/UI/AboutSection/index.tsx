import {
	Heading,
	Icon,
	IconButton,
	SkeletonText,
	Stack,
	Text,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { useAbout } from '~/store/useAbout';
import { api } from '~/utils/api';
import AddressInputs from '../Address/AddressInputs';
import AddressAction from './AddressAction';

const AboutSection = () => {
	const { data: role } = api.user.getRole.useQuery();
	const { data: about, isLoading: isLoadingAbout } = api.about.get.useQuery();

	const [edit, setEdit, setInput] = useAbout((state) => [
		state.edit,
		state.setEdit,
		state.setInput,
	]);
	const handlClick = () => {
		if (about) {
			const { id, title, content } = about;
			setEdit({ is: true, id });
			setInput({ content, title });
		}
	};
	if (isLoadingAbout)
		return (
			<Stack w={500}>
				<SkeletonText noOfLines={1} skeletonHeight={7} w={200} mb={5} />
				<SkeletonText noOfLines={15} skeletonHeight="2" spacing={5} />
			</Stack>
		);
	return (
		<Stack>
			{(!about || edit.is) && (
				<Stack>
					<AddressInputs />
					<AddressAction />
				</Stack>
			)}
			<Stack>
				<Heading as="h1">{about?.title}</Heading>
				{role === 'ADMIN' && !edit.is && (
					<IconButton
						aria-label="edit"
						icon={
							<Icon as={AiFillEdit} size="sm" color="teal.300" />
						}
						onClick={handlClick}
					/>
				)}
			</Stack>
			<Text>{about?.content}</Text>
		</Stack>
	);
};

export default AboutSection;
