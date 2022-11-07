import { ThreeEvent } from '@react-three/fiber';
import { usePlane } from "@react-three/cannon";
import { Mesh } from 'three';
import { groundTexture } from "../images/textures";
import { useStore } from "../hooks/useStore";

type AltKeyTypes = ThreeEvent<MouseEvent> & { altKey: boolean }

export const Ground = () => {
    const [ref] = usePlane<Mesh>(() => ({
        rotation: [-Math.PI / 2, 0, 0], position: [0, -0.5, 0]
    }));
    const [addCube] = useStore((state) => [state.addCube])

    groundTexture.repeat.set(50, 50);

    return (
        <mesh
            onClick={(e) => {
                const { altKey, stopPropagation, point } = e as AltKeyTypes;
                const [x, y, z] = Object.values(point).map(val => Math.ceil(val));

                stopPropagation();
                if (false/* !altKey */) addCube(x, y, z);
            }}
            ref={ref}
        >
            <planeGeometry attach='geometry' args={[50, 50]} />
            <meshLambertMaterial attach='material' map={groundTexture} />
        </mesh>
    )
}