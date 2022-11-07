import { ThreeEvent } from '@react-three/fiber';
import { useBox } from "@react-three/cannon"
import { Mesh, BoxGeometry, MeshBasicMaterial, SphereGeometry } from 'three';
import { useStore } from "../hooks/useStore";
import * as textures from "../images/textures"
import { useMemo, useState } from 'react';
import { MeshDistortMaterial } from "@react-three/drei";
import { useKeyboard } from '../hooks/useKeyboard';


type onClickProps = ThreeEvent<MouseEvent> & { altKey: boolean }

interface CubeTypes {
    position: [x: number, y: number, z: number];
    texture: string;
}

export const Cube = ({ position, texture }: CubeTypes) => {
    const {
        deleteCube
    } = useKeyboard();

    const geom = useMemo(() => new BoxGeometry(), [])
    const mat = useMemo(() => new MeshBasicMaterial(), [])

    const [isHovered, setIsHovered] = useState<number | null>(null)
    const [addCube, removeCube] = useStore((state) => [state.addCube, state.removeCube]);
    const activeTexture = textures[texture + 'Texture' as keyof typeof textures];

    const [ref] = useBox<Mesh>(() => ({
        type: 'Static',
        position
    }));

    function GameItems() {

        if (texture === 'fire') {
            return (
                <>
                    <pointLight distance={27} intensity={0.8} />
                    <boxGeometry attach="geometry" />

                    {[...Array(6)].map((_, index) => (
                        <meshStandardMaterial
                            attach={`material-${index}`}
                            transparent={true}
                            metalness={4}
                            opacity={0.8}
                            key={index}
                            map={activeTexture}
                            color={isHovered === index ? "hotpink" : "white"}
                        />
                    ))}

                    {/* <MeshDistortMaterial
                        attach="material"
                        distort={1} // Strength, 0 disables the effect (default=1)
                        speed={10} // Speed (default=1)
                    /> */}
                </>
            )
        }

        return (
            <>
                {[...Array(6)].map((_, index) => (
                    <meshStandardMaterial
                        attach={`material-${index}`}
                        key={index}
                        map={activeTexture}
                        color={isHovered === index ? "hotpink" : "white"}
                        transparent={true}
                        opacity={texture === 'glass' ? 0.3 : 1}
                    />
                ))}
                <boxGeometry attach="geometry" />
            </>
        );
    }

    return (
        <mesh
            geometry={geom}
            material={mat}

            receiveShadow
            castShadow

            onPointerMove={(e) => {
                e.stopPropagation();
                setIsHovered(Math.floor(Number(e.faceIndex) / 2));
            }}

            onPointerOut={(e) => {
                e.stopPropagation();
                setIsHovered(null);
            }}

            onClick={(e: onClickProps) => {
                e.stopPropagation();
                const { x, y, z } = ref.current!.position

                if (deleteCube) {
                    console.log('delete-cube')
                    removeCube(x, y, z)
                    return
                };

                const dirFace = [
                    [x + 1, y, z],
                    [x - 1, y, z],
                    [x, y + 1, z],
                    [x, y - 1, z],
                    [x, y, z + 1],
                    [x, y, z - 1],
                ];

                const clickedFace = Math.floor(Number(e.faceIndex) / 2);

                if (false) addCube(
                    dirFace[clickedFace][0],
                    dirFace[clickedFace][1],
                    dirFace[clickedFace][2]
                )
            }}

            ref={ref}><GameItems /></mesh>
    )
}