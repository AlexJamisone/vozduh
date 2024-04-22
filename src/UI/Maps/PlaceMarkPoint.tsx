import { Placemark } from '@pbe/react-yandex-maps';
import { FiltredPoint } from '~/server/api/routers/cdek';

const PlacemarkPoint = ({ point }: { point: FiltredPoint }) => {
	return (
		<Placemark
			geometry={[point.latitude, point.longitude]}
			onClick={() => {}}
			fillColor="ff0000"
			options={{
				preset:
					point.name === ''
						? 'islands#darkGreenCircleIcon'
						: 'islands#blueCircleIcon',
			}}
		/>
	);
};

export default PlacemarkPoint;
