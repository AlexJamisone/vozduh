import { Stack, TabPanel } from '@chakra-ui/react';
import CategoryAction from './CategoryAction';
import CategoryButton from './CategoryButton';
import CategoryImg from './CategoryImg';
import CategoryInput from './CategoryInput';

const AdminCategorys = () => {
	return (
		<TabPanel>
			<Stack justifyContent="center">
				<Stack direction="row" alignItems="center" gap={5}>
					<Stack gap={3}>
						<CategoryInput />
						<CategoryImg />
					</Stack>
					<CategoryButton />
				</Stack>
				<CategoryAction />
			</Stack>
		</TabPanel>
	);
};

export default AdminCategorys;
