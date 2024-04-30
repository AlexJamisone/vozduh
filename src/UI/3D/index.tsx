import { Box, Spinner } from '@chakra-ui/react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
	Bloom,
	EffectComposer,
	N8AO,
	ToneMapping,
} from '@react-three/postprocessing';
import { Suspense, useEffect, useState } from 'react';
import Model from './Model';
export default function Ring() {
	const [isClent, setIsClient] = useState(false);
	useEffect(() => {
		setIsClient(true);
	}, []);
	if (!isClent) return null;

	return (
		<Box w={600} h={500} onScroll={(e) => e.preventDefault()}>
			<Suspense fallback={<Spinner />}>
				<Canvas onChange={(e) => e.preventDefault()}>
					<spotLight
						position={[10, 10, 10]}
						angle={0.15}
						penumbra={1}
						decay={0}
						intensity={Math.PI}
					/>
					<Model />
					<AccumulativeShadows
						temporal
						frames={100}
						color="#000000"
						opacity={1.05}
					>
						<RandomizedLight radius={5} position={[10, 5, -5]} />
					</AccumulativeShadows>
					<EffectComposer>
						<N8AO
							aoRadius={0.15}
							intensity={4}
							distanceFalloff={2}
						/>
						<Bloom
							luminanceThreshold={3.5}
							intensity={0.85}
							levels={9}
							mipmapBlur
						/>
						<ToneMapping />
					</EffectComposer>
				</Canvas>
			</Suspense>
		</Box>
	);
}
