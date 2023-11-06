import {
	Button,
	Heading,
	Icon,
	IconButton,
	Input,
	SkeletonText,
	Stack,
	Text,
	Textarea,
	useToast,
} from '@chakra-ui/react';
import { useReducer } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { SlInfo } from 'react-icons/sl';
import NoData from '~/components/NoData';
import { aboutReducer, initialState } from '~/reducer/aboutReducer';
import { api } from '~/utils/api';

const AboutSection = () => {
	const { data: role } = api.user.getRole.useQuery();
	const { data: about, isLoading: isLoadingAbout } = api.about.get.useQuery();
	const { mutate: createOrUpdate, isLoading } =
		api.about.createOrUpdate.useMutation();
	const ctx = api.useContext();
	const toast = useToast();
	const [state, dispatch] = useReducer(aboutReducer, initialState);
	const { content, edit, title, id } = state;
	if (isLoadingAbout)
		return (
			<Stack w={500}>
				<SkeletonText noOfLines={1} skeletonHeight={7} w={200} mb={5} />
				<SkeletonText noOfLines={15} skeletonHeight="2" spacing={5} />
			</Stack>
		);
	return (
		<Stack cursor={role === 'ADMIN' ? 'pointer' : 'default'} gap={'50px'}>
			{!edit && (
				<Heading
					fontFamily="Jost, sans-serif"
					textAlign="center"
					border="2px solid"
					rounded={'xl'}
					p={3}
					fontSize={[14, 16]}
					onClick={
						role === 'ADMIN'
							? () => {
									dispatch({
										type: 'SET_ABOUT',
										payload: {
											id: about?.id ?? '',
											content:
												about?.content.join('\n\n') ??
												'',
											edit: true,
											title: about?.title ?? '',
										},
									});
							  }
							: undefined
					}
				>
					{about?.title ?? 'Пока нет название секции'}
				</Heading>
			)}
			{edit && (
				<Input
					w={400}
					placeholder="Название секции"
					value={title}
					onChange={(e) =>
						dispatch({
							type: 'SET_ABOUT',
							payload: {
								...state,
								title: e.target.value,
							},
						})
					}
				/>
			)}
			{!edit && (
				<Stack gap={5} alignItems="center">
					{!about && <NoData icon={SlInfo} title="Нет контента" />}
					{about?.content.map((content, index) => (
						<Text
							key={index}
							maxW={400}
							textAlign="center"
							fontSize={[14, 16]}
							onClick={
								role === 'ADMIN'
									? () => {
											dispatch({
												type: 'SET_ABOUT',
												payload: {
													id: about?.id ?? '',
													content:
														about?.content.join(
															'\n\n'
														) ?? '',
													edit: true,
													title: about?.title ?? '',
												},
											});
									  }
									: undefined
							}
						>
							{content}
						</Text>
					))}
				</Stack>
			)}
			{edit && (
				<Textarea
					h={150}
					placeholder="Расскажи о своей компании"
					value={content}
					onChange={(e) =>
						dispatch({
							type: 'SET_ABOUT',
							payload: {
								...state,
								content: e.target.value,
							},
						})
					}
				/>
			)}
			{edit && (
				<Stack direction="row" justifyContent="flex-end">
					<IconButton
						aria-label="back"
						icon={<Icon as={IoIosArrowBack} />}
						onClick={() => dispatch({ type: 'CLEAR' })}
					/>
					<Button
						isLoading={isLoading}
						colorScheme="telegram"
						onClick={() =>
							createOrUpdate(
								{
									title,
									id: id.length !== 0 ? id : undefined,
									content: content.split(/\n/g),
								},
								{
									onSuccess: ({ message }) => {
										void ctx.about.invalidate();
										dispatch({ type: 'CLEAR' });
										toast({
											description: message,
											status: 'success',
											isClosable: true,
											position: 'top-right',
										});
									},
									onError: ({ message }) => {
										toast({
											description: message,
											status: 'error',
											isClosable: true,
											position: 'top-right',
										});
									},
								}
							)
						}
					>
						{!about ? 'Создать' : 'Обновить'}
					</Button>
				</Stack>
			)}
		</Stack>
	);
};

export default AboutSection;
