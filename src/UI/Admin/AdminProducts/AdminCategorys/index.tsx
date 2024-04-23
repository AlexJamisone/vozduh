import { Stack, TabPanel } from '@chakra-ui/react';
import CategoryAction from './CategoryAction';
import CategoryImg from './CategoryImg';
import CategoryInput from './CategoryInput';

const AdminCategorys = () => {
	return (
		<TabPanel>
			<Stack gap={3}>
				<CategoryInput />
				<CategoryImg />
				<CategoryAction />
			</Stack>
		</TabPanel>
	);
};

export default AdminCategorys;
