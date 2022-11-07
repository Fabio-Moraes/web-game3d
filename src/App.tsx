import { Physics } from '@react-three/cannon';
import { Sky, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ground } from './components/Ground';
import { Player } from './components/Player';
import { FPV } from './components/FPV';
import { Cubes } from './components/Cubes';
import { TextureSelector } from './components/TextureSelector';
import { Menu } from './components/Menu';

import { useStore } from "./hooks/useStore"

import './App.css'

function App() {
  const [saveCubes] = useStore((state) => [state.cubes])

  return (
    <>
      <Canvas gl={{ alpha: false }}
      >
        <ambientLight intensity={0.5} />
        <Sky sunPosition={[100, 100, 20]} />
        {/* <FPV />  */}
        <Physics>
          <Player />
          <Cubes />
          <Ground />
        </Physics>
      </Canvas>
      {/* <div className='absolute centered cursor'>+</div> */}
      < TextureSelector />
      <Menu />
    </>
  )
}

export default App
