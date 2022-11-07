import { PointerLockControls, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const FPV = () => {
    const { camera, gl } = useThree();

    return (<OrbitControls args={[camera, gl.domElement]} />)

    //<PointerLockControls args={[camera, gl.domElement]} />
}