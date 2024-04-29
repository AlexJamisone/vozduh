import { useMediaQuery } from '@chakra-ui/react';
import { Map } from '@pbe/react-yandex-maps';
import { useAddress } from '~/store/useAddress';
import PlacemarkPoint from './PlaceMarkPoint';

type MapsProps = {
	width?: number;
	height?: number;
};

const Maps = ({ height, width }: MapsProps) => {
	const point = useAddress((state) => state.point);
	const [lat, lon] = useAddress((state) => [
		state.point?.valueSuggestion?.data.geo_lat,
		state.point?.valueSuggestion?.data.geo_lon,
	]);
	const [isLowerThen900] = useMediaQuery(['(max-width: 900px)']);
	return (
		<Map
			state={{
				center: [Number(lat), Number(lon)],
				zoom: 11,
			}}
			height={
				height
					? `${height}px`
					: undefined ?? isLowerThen900
					? '250px'
					: '400px'
			}
			width={
				width
					? `${width}px`
					: undefined ?? isLowerThen900
					? '300px'
					: '400px'
			}
		>
			{point?.points?.map((point, index) => (
				<PlacemarkPoint key={index} point={point} />
			))}
		</Map>
	);
};

export default Maps;
