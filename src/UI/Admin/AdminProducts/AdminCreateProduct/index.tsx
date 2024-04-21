import { Stack, TabPanel } from '@chakra-ui/react';
import AdditionalService from './AdditionalService';
import CreateProductAction from './CreateProductAction';
import CreateProductInputs from './CreateProductInputs';
import ImageUploader from './ImageUploader';
import SelectCategory from './SelectCategory';
import SelectSize from './SelectSize';

const AdminCreateProduct = () => {
	return (
		<TabPanel>
			<Stack
				gap={3}
				minW={[300, 500, 600]}
				maxW={[650]}
				maxH={630}
				overflowY="auto"
				px={10}
				sx={{
					'::-webkit-scrollbar': {
						width: '5px',
						height: '5px',
					},
					'::-webkit-scrollbar-track': {
						bgColor: '#eee',
						boxShadow:
							'0 0 1px 1px #bbb, inset 0 0 7px rgba(0,0,0,0.3)',
						borderRadius: '2xl',
					},
					'::-webkit-scrollbar-thumb': {
						bgColor: 'linear-gradient(left, #96A6BF, #63738C)',
						rounded: '2xl',
						boxShadow: 'inset 0 0 1px 1px #5C6670',
					},
				}}
			>
				<ImageUploader />
				<CreateProductInputs />
				<SelectCategory />
				<SelectSize />
				<AdditionalService />
				<CreateProductAction />
			</Stack>
		</TabPanel>
	);
};

export default AdminCreateProduct;
