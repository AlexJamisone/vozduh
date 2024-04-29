import { Placemark } from '@pbe/react-yandex-maps';
import type { FiltredPoint } from '~/server/api/routers/cdek';
import { useAddress } from '~/store/useAddress';

const PlacemarkPoint = ({ point }: { point: FiltredPoint }) => {
	const [set, name, setCtrl] = useAddress((state) => [
		state.setPoint,
		state.point?.selected?.name,
		state.setController,
	]);
	return (
		<Placemark
			geometry={[point.latitude, point.longitude]}
			onClick={() => {
				setCtrl({ showPVZ: true });
				set({ selected: point });
			}}
			fillColor="ff0000"
			options={{
				preset:
					point.name === name
						? 'islands#darkGreenCircleIcon'
						: 'islands#blueCircleIcon',
			}}
		/>
	);
};

export default PlacemarkPoint;
