import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useCreateProduct } from '~/store/useCreateProduct';
import AdminCategorys from './AdminCategorys';
import AdminCreateProduct from './AdminCreateProduct';
import AdminSize from './AdminSize';

const AdminProducts = () => {
	const setTab = useCreateProduct((state) => state.setTab);
	const edit = useCreateProduct((state) => state.edit.isEdit);
	const tab = useCreateProduct((state) => state.tab);
	return (
		<Tabs isLazy onChange={setTab} align="center" index={tab}>
			<TabList>
				<Tab>Товары</Tab>
				<Tab>{edit ? 'Обновить' : 'Создать'}</Tab>
				<Tab>Категории</Tab>
				<Tab>Размеры</Tab>
			</TabList>
			<TabPanels>
				<TabPanel>Товары</TabPanel>
				<AdminCreateProduct />
				<AdminCategorys />
				<AdminSize />
			</TabPanels>
		</Tabs>
	);
};

export default AdminProducts;
