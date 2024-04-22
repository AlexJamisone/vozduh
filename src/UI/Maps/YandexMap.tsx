import { AnimatePresence } from 'framer-motion';
import Maps from './Maps';
import YandexProvider from './YandexProvider';
type YandexMapProps = {
	width?: number;
	height?: number;
};

const YandexMap = ({ height, width }: YandexMapProps) => {
	return (
		<AnimatePresence>
			<YandexProvider>
				<Maps width={width} height={height} />
			</YandexProvider>
		</AnimatePresence>
	);
};

export default YandexMap;
