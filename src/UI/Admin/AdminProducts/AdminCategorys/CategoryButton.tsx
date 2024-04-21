import { Button, ButtonGroup, Icon, IconButton, Stack } from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import { useCreateCategory } from '~/store/useCreateCategory';
import { api } from '~/utils/api';

export default function CategoryButton() {
	const { data: categorys } = api.categorys.get.useQuery();
	const { mutate: deletCat, isLoading } = api.categorys.delete.useMutation(
		{}
	);
	const setEdit = useCreateCategory((state) => state.setEdit);
	const setInputs = useCreateCategory((state) => state.setInputs);
	const setImg = useCreateCategory((state) => state.setImg);
	const handlDelet = (image: string, id: string) => {
		deletCat({ image, id });
	};
	const handlEdit = (
		id: string,
		title: string,
		image: string,
		path: string
	) => {
		setEdit({ is: true, id });
		setInputs({ title, path });
		setImg(image);
	};
	return (
		<Stack flexWrap="wrap">
			{categorys?.map(({ id, title, image, path }) => (
				<ButtonGroup isAttached variant="outline" size="sm" key={id}>
					<Button onClick={() => handlEdit(id, title, image, path)}>
						{title}
					</Button>
					<IconButton
						isLoading={isLoading}
						aria-label="delet-category"
						icon={<Icon as={MdDelete} />}
						colorScheme="red"
						onClick={() => handlDelet(id, image)}
					/>
				</ButtonGroup>
			))}
		</Stack>
	);
}
