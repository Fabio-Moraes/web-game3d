import { useFrame, useThree } from "@react-three/fiber";
import { useSphere, useBox } from "@react-three/cannon";
import { Mesh, Vector3, BoxGeometry, MeshBasicMaterial, SphereGeometry } from 'three';
import { useEffect, useMemo, useRef } from "react";
import { useKeyboard } from "../hooks/useKeyboard";

import { MeshDistortMaterial } from "@react-three/drei"

import * as textures from "../images/textures"

import { OrbitControls, PerspectiveCamera, OrthographicCamera, DeviceOrientationControls } from "@react-three/drei";

const JUMP_FORCE = 4;
const SPEED = 4;

export const Player = () => {
    const geom = useMemo(() => new SphereGeometry(1, 45, 45), [])
    const mat = useMemo(() => new MeshBasicMaterial(), [])

    const { moveBackward, moveForward, moveRight, moveLeft, jump } = useKeyboard();

    const { camera, gl } = useThree();

    const [ref, api] = useSphere<Mesh>(() => ({
        mass: 1,
        type: 'Dynamic',
        position: [0, 1, 0]
    }))

    const vel = useRef([0, 0, 0])
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v)
    }, [api.velocity])

    const pos = useRef([0, 0, 0])
    useEffect(() => {
        api.position.subscribe((p) => pos.current = p)
    }, [api.position])



    useFrame((state) => {
        const direction = new Vector3();

        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
        )

        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0
        )

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation)

        api.velocity.set(direction.x, vel.current[1], direction.z)

        if (jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[2])
        }

    })

    return (
        <>
            <PerspectiveCamera makeDefault />
            <OrbitControls target={[pos.current[0], pos.current[1], pos.current[2]]} args={[camera, gl.domElement]} minDistance={7} maxDistance={7} maxPolarAngle={1.45} />
            <pointLight
                position={[pos.current[0] - 2, pos.current[1] + 2, pos.current[2]]}
                distance={17}
                intensity={0.6}
            />
            <mesh
                ref={ref}
                geometry={geom}
                material={mat}

                receiveShadow
                castShadow
            >
                <MeshDistortMaterial
                    /* map={textures.dirtTexture} */
                    attach="material"
                    color={'#87CEEB'}
                    distort={moveForward || moveBackward || moveLeft || moveRight ? 1 : .6}
                    transparent
                    opacity={.9}
                    speed={10} // Speed (default=1)
                />
            </mesh>
        </>
    )
}