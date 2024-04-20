import { Tab, TabList, TabPanels, Tabs } from '@chakra-ui/react';
import { useCreateProduct } from '~/store/useCreateProduct';

const AdminProducts = () => {
	const setTab = useCreateProduct((state) => state.setTab);
    const edit = useCreateProduct(state => state.edit.isEdit)
	return (
		<Tabs isLazy onChange={setTab}>
			<TabList>
				<Tab>Товары</Tab>
				<Tab>{edit ? "Обновить" : "Создать"}</Tab>
				<Tab>Категории</Tab>
				<Tab>Размеры</Tab>
			</TabList>
			<TabPanels>
                
            </TabPanels>
		</Tabs>
	);
};

export default AdminProducts;
