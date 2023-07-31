import { Placemark } from '@pbe/react-yandex-maps';
import type { Point } from '@prisma/client';
import { useCreateAddressContext } from '~/context/addressContext';

type PlacemarkPointProps = {
	point: Point;
};

const PlacemarkPoint = ({ point }: PlacemarkPointProps) => {
	const { dispatchAddress, address } = useCreateAddressContext();
	return (
		<Placemark
			geometry={[point.latitude, point.longitude]}
			onClick={() => {
				dispatchAddress({
					type: 'SET_POINT',
					payload: {
						selected: point,
						selectedLat: point.latitude,
						selectedLon: point.longitude,
					},
				});
				dispatchAddress({ type: 'SET_SELECT_POINT', payload: true });
			}}
			fillColor="ff0000"
			options={{
				preset:
					address.point?.selected?.name === point.name
						? 'islands#darkGreenCircleIcon'
						: 'islands#blueCircleIcon',
			}}
		/>
	);
};

export default PlacemarkPoint;
