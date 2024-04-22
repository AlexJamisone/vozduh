import {
	Avatar,
	Card,
	CardBody,
	HStack,
	Input,
	Skeleton,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react';
import { useClerk } from '@clerk/nextjs';
import type { ChangeEvent } from 'react';
import { api } from '~/utils/api';

const UserInfo = () => {
	const { user: userClerk } = useClerk();
	const { data: user, isLoading } = api.user.get.useQuery();

	const toast = useToast();
	const handlAvatar = async (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			try {
				await userClerk?.setProfileImage({ file: e.target.files[0] });
				await userClerk?.reload();
				toast({
					description: 'Аватарка успешно обновленна!',
					status: 'success',
				});
			} catch (error) {
				toast({
					description: `Произошла ошибка в обновлении аватарки!`,
					status: 'error',
				});
			}
		}
	};
	if (isLoading)
		return (
			<Stack direction="row">
				<Stack>
					<Skeleton w={400} h={100} />
					<Skeleton w={400} h={390} />
				</Stack>
				<Skeleton w={620} h={500} />
			</Stack>
		);
	return (
		<Card>
			<CardBody>
				<Stack direction="row" fontWeight={600}>
					<Stack>
						<Input
							type="file"
							accept=".jpg, .png, .gif, .jpeg"
							display="none"
							id="upload"
							onChange={(e) => void handlAvatar(e)}
							w="100%"
							h="100%"
							position="relative"
						/>
						<Avatar
							as="label"
							htmlFor="upload"
							cursor="pointer"
							size="lg"
							src={user?.profileImageUrl}
						/>
					</Stack>
					<Stack>
						<Text>{user?.email}</Text>
						<HStack>
							<Text>{user?.firstName}</Text>
							<Text>{user?.lastName}</Text>
						</HStack>
					</Stack>
				</Stack>
			</CardBody>
		</Card>
	);
};

export default UserInfo;
