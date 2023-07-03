import { useFrame } from '@react-three/fiber';
import { useContext, useRef } from 'react';


import DynaText from '@/model/core/DynaText';
import { AppContext } from '@/../script/state/context/AppContext';

function FloatingStart({ calls }: any) {
  const app:any = useContext(AppContext)

  const $textGroup: any = useRef()
  useFrame((ctx, delta) => {
    if (!$textGroup.current) return
    $textGroup.current.position.y = Math.sin(Date.now() / 500) / 50 -0.2
  })

  const triggerStartClick = ()=> {
    app.alert("error", "Click the RED Button!")
    app.audio("neutral", "./sound/info.wav")
  }

  return (<>
    <group position={[0.4, 0, -0.5]}>
      <group ref={$textGroup}>
        <DynaText  onClick={triggerStartClick}
           text="Start" color="#990000" font={0.25}
          position={[-0.65, 0.1, -0.35]} rotation={[-0.65, 0., 0]}
        >
        </DynaText>
      </group>
      <DynaText text="Click the button" color="#000" font={0.12} 
        onClick={()=>{ app.alert("neutral","Click the RED Button to start the game") }}
        position={[-1.1, -0.445, 0.05]} rotation={[-Math.PI / 2, 0, 0.3]}
      >
      </DynaText>
    </group>
  </>)
}

export default FloatingStart