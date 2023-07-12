import React, { useState } from "react";
import { Box, Plane } from "@react-three/drei";

type Props = {
  cubeSize?: number;
  xCount?: number;
  yCount?: number;
  zCount?: number;
  blockedCoords?: any;
  calls?: any;
};

const GridBlocks: React.FC<Props> = ({
  calls = {},
  blockedCoords = [],
  cubeSize = 1,
  xCount = 100,
  yCount = 5,
  zCount = 100,
}) => {
  const [localY, s__localY] = useState(0)
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const [solidBlocks, setSolidBlocks] = useState<number[]>([]);

  

  const handlePlaneClick = (e:any, index: number, heightLevel: number) => {
    if (solidBlocks.includes(index)) {
      return e.stopPropagation()
      // s__localY
    }

    if (blockedCoords.includes(index)) {
      return e.stopPropagation()
      // s__localY
    }

    let parentResult = calls.triggerSetBlock(e, index)
    if (!parentResult) {
      // console.log("!parentResult) {        return")
      return
    }

    setSolidBlocks([...solidBlocks, index]);

    // setHoveredBlock(null);
  };
  const handlePlaneHover = (e:any,index: number) => {
    if (!solidBlocks.includes(index)) {
    } else { e.stopPropagation() }
    // setHoveredBlock(index);
  };
  const handlePlaneHoverEnd = () => {
    // setHoveredBlock(null);
  };
  const handleWireClick = (e:any, index: number) => {
    if (!solidBlocks.includes(index)) {
    } else { e.stopPropagation() }
  };
  const handleWireHover = (e:any,index: number) => {
    if (!solidBlocks.includes(index)) {
    } else { e.stopPropagation() }
  };
  const handleWireHoverEnd = () => { };



  return (
    <group position={[0, 0, 0]}>
      {Array.from({ length: xCount * yCount * zCount }).map((_, index) => {
        const x = cubeSize * (index % xCount)
        const y =  (Math.floor(index / (xCount * zCount)))
        const z = cubeSize * (Math.floor((index % (xCount * zCount)) / xCount))

        const xPos = x - (cubeSize * ((xCount - 1) / 2));
        const yPos = y - ( ((yCount - 1) / 2));
        const zPos = z - (cubeSize * ((zCount - 1) / 2));

        const isSolid = solidBlocks.includes(index);
        const isHovered = index === hoveredBlock;

        return (
          <group key={index}>

            {isSolid &&  (
              <Box  args={[cubeSize, cubeSize, cubeSize]} position={[xPos, (yPos + (cubeSize/2)) - cubeSize/100, zPos]}
                onClick={(e:any) => handleWireClick(e,index)} onPointerOut={handleWireHoverEnd}
                onPointerOver={(e:any) => handleWireHover(e,index)}
              >
                <meshStandardMaterial transparent={true}
                  opacity={0.1} color={"#777777"} 
                />
              </Box>
            )}
            { (
              <Plane  args={[cubeSize, cubeSize]} onPointerOut={handlePlaneHoverEnd}
                position={[xPos, isSolid ? cubeSize + 0.001 : 0.001, zPos]}
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={(e:any) => handlePlaneClick(e,index, parseInt(isSolid ? "1" : ""))}
                onPointerOver={(e:any) => handlePlaneHover(e,index)}
              >
                <meshStandardMaterial color="#74aC3E" wireframe={true} />
              </Plane>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default GridBlocks;
