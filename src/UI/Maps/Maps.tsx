import { useMediaQuery } from '@chakra-ui/react';
import { Map } from '@pbe/react-yandex-maps';
import { useCreateAddressContext } from '~/context/addressContext';
import PlacemarkPoint from './PlaceMarkPoint';

type MapsProps = {
	width?: number;
	height?: number;
};

const Maps = ({ height, width }: MapsProps) => {
	const { valueSuggestion, points } = useCreateAddressContext();
	const [isLowerThen900] = useMediaQuery(['(max-width: 900px)']);
	return (
		<Map
			state={{
				center: [
					Number(valueSuggestion?.data.geo_lat),
					Number(valueSuggestion?.data.geo_lon),
				],
				zoom: 11,
			}}
			height={height ?? isLowerThen900 ? '250px' : '400px'}
			width={width ?? isLowerThen900 ? '300px' : '400px'}
		>
			{points?.map((point, index) => (
				<PlacemarkPoint key={index} point={point} />
			))}
		</Map>
	);
};

export default Maps;
