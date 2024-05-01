// @ts-nocheck
import { useMediaQuery } from '@chakra-ui/react';
import { Float, Mesh, MeshTransmissionMaterial } from '@react-three/drei';
import { MeshProps, useLoader } from '@react-three/fiber';
import { useMotionValue, useSpring } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { useEffect, useRef } from 'react';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export default function Model() {
	const material = useLoader(MTLLoader, '/1.mtl');
	const obj = useLoader(OBJLoader, '/1.obj', (loader) => {
		material.preload();
		loader.setMaterials(material);
	});
	return (
		<group scale={0.2}>
			{obj.children.slice(2, 3).map((mesh, i) => (
				<Mesh data={mesh} key={i} />
			))}
		</group>
	);
}
function Mesh(props: { data: MeshProps }) {
	const [less500] = useMediaQuery('(max-width: 500px)', {
		ssr: true,
		fallback: false,
	});
	const ref = useRef<Mesh>(null!);
	const option = {
		damping: 20,
	};
	const mouse = {
		x: useSpring(useMotionValue(0), option),
		y: useSpring(useMotionValue(0), option),
	};
	function manageMouseMove(e: MouseEvent) {
		const { innerWidth, innerHeight } = window;
		const { clientX, clientY } = e;
		const x = -0.5 + clientX / innerWidth;
		const y = -0.5 + clientY / innerHeight;
		mouse.x.set(x);
		mouse.y.set(y);
	}
	useEffect(() => {
		ref.current.geometry.center();
	}, []);
	useEffect(() => {
		window.addEventListener('mousemove', manageMouseMove);
		return () => window.removeEventListener('mousemove', manageMouseMove);
	}, []);
	return (
		<Float
			scale={0.5}
			speed={less500 ? 2 : 3}
			rotationIntensity={less500 ? 1 : 2}
			floatIntensity={1}
		>
			<motion.mesh
				{...props.data}
				ref={ref}
				rotation-x={mouse.y}
				rotation-y={mouse.x}
				position={[less500 ? 0 : 15, less500 ? 7 : 1, 1]}
			>
				<MeshTransmissionMaterial
					metalness={1.25}
					roughness={0.3}
					color="#C0C0C0"
				/>
			</motion.mesh>
		</Float>
	);
}
