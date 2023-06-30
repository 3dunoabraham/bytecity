import React, { useState } from "react";
import { Box, Plane } from "@react-three/drei";

type Props = {
  xCount?: number;
  yCount?: number;
  zCount?: number;
};

const GridBlocks: React.FC<Props> = ({
  xCount = 100,
  yCount = 5,
  zCount = 100,
}) => {
  const [localY, s__localY] = useState(0)
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const [solidBlocks, setSolidBlocks] = useState<number[]>([]);
  const handlePlaneClick = (e:any, index: number, heightLevel: number) => {
    if (!solidBlocks.includes(index)) {
      setSolidBlocks([...solidBlocks, index]);
      // s__localY
    } else {
      alert()

      e.stopPropagation()
    }
    setHoveredBlock(null);
  };
  const handlePlaneHover = (e:any,index: number) => {
    if (!solidBlocks.includes(index)) {
    } else { e.stopPropagation() }
    setHoveredBlock(index);
  };
  const handlePlaneHoverEnd = () => { setHoveredBlock(null); };
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
        const x = index % xCount;
        const y = Math.floor(index / (xCount * zCount));
        const z = Math.floor((index % (xCount * zCount)) / xCount);

        const xPos = x - (xCount - 1) / 2;
        const yPos = y - (yCount - 1) / 2;
        const zPos = z - (zCount - 1) / 2;

        const isSolid = solidBlocks.includes(index);
        const isHovered = index === hoveredBlock;

        return (
          <group key={index}>

            {isSolid &&  (
              <Box receiveShadow={!isSolid} castShadow={isSolid} args={[1, 1, 1]} position={[xPos, yPos, zPos]}
                onClick={(e:any) => handleWireClick(e,index)} onPointerOut={handleWireHoverEnd}
                onPointerOver={(e:any) => handleWireHover(e,index)}
              >
                <meshStandardMaterial transparent={!isSolid && !isHovered}
                  opacity={0.1} color={isSolid ? "#777777" : undefined}
                />
              </Box>
            )}
            { (
              <Plane castShadow receiveShadow args={[1, 1]} onPointerOut={handlePlaneHoverEnd}
                position={[xPos, isSolid ? +0.51 : -0.5, zPos]}
                rotation={[-Math.PI / 2, 0, 0]}
                onClick={(e:any) => handlePlaneClick(e,index, parseInt(isSolid ? "1" : ""))}
                onPointerOver={(e:any) => handlePlaneHover(e,index)}
              >
                <meshStandardMaterial color="#88aa88" />
              </Plane>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default GridBlocks;
