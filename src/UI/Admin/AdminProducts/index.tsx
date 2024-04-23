import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { useCreateProduct } from '~/store/useCreateProduct';
import AdminCategorys from './AdminCategorys';
import AdminCreateProduct from './AdminCreateProduct';
import AdminProduc from './AdminProduct';
import AdminSize from './AdminSize';

export default function AdminCreate() {
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
				<AdminProduc />
				<AdminCreateProduct />
				<AdminCategorys />
				<AdminSize />
			</TabPanels>
		</Tabs>
	);
}
