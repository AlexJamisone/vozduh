import { TabPanel } from '@chakra-ui/react';
import CategoryImg from './CategoryImg';
import CategoryInput from './CategoryInput';

const AdminCategorys = () => {
	return (
		<TabPanel>
			<CategoryInput />
			<CategoryImg />
		</TabPanel>
	);
};

export default AdminCategorys;
