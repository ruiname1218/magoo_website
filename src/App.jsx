import { Canvas } from '@react-three/fiber'
import Experience from './components/canvas/Experience'
import Overlay from './components/ui/Overlay'

function App() {
  return (
    <div className="app-container">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <Experience />
      </Canvas>
      <Overlay />
    </div>
  )
}

export default App
