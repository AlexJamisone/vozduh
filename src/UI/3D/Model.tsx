// @ts-nocheck
import { Float, MeshTransmissionMaterial, useGLTF } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import { useControls } from 'leva';

export default function Model() {
	const { nodes } = useGLTF('/ring2.glb');
	return (
		<group scale={5}>
			{nodes.Scene?.children.map((mesh, i) => (
				<Mesh data={mesh} key={i} />
			))}
		</group>
	);
}
function Mesh(props: { data: MeshProps }) {
	const materialProps = useControls({
		metalness: { value: 0 },
		position: { x: 0, y: 0, z: 0 },
	});
	return (
		<Float>
			<mesh {...props.data} rotateY={180}>
				<MeshTransmissionMaterial
					roughness={0.15}
					metalness={0.3}
					transmission={0.5}
					{...materialProps}
				/>
			</mesh>
		</Float>
	);
}
