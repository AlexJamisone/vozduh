import { YMaps } from '@pbe/react-yandex-maps';
import React from 'react';
import { env } from '~/env.mjs';

const YandexProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<YMaps
			query={{
				lang: 'ru_RU',
				apikey: env.NEXT_PUBLIC_YANDEX_API,
			}}
			version="2.1.79"
		>
			{children}
		</YMaps>
	);
};

export default YandexProvider;
