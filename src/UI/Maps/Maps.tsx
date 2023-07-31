import { useMediaQuery } from '@chakra-ui/react';
import { Map } from '@pbe/react-yandex-maps';
import { useCreateAddressContext } from '~/context/addressContext';
import PlacemarkPoint from './PlaceMarkPoint';

type MapsProps = {
	width?: number;
	height?: number;
};

const Maps = ({ height, width }: MapsProps) => {
	const { valueSuggestion, points, address } = useCreateAddressContext();
	const [isLowerThen900] = useMediaQuery(['(max-width: 900px)']);
	return (
		<Map
			state={{
				center: [
					address.point.selectedLat ??
						Number(valueSuggestion?.data.geo_lat),
					address.point.selectedLon ??
						Number(valueSuggestion?.data.geo_lon),
				],
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
			{points?.map((point, index) => (
				<PlacemarkPoint key={index} point={point} />
			))}
		</Map>
	);
};

export default Maps;
