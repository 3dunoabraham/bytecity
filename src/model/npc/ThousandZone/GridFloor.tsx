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
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const [solidBlocks, setSolidBlocks] = useState<number[]>([]);

  const handlePlaneClick = (index: number) => {
    if (!solidBlocks.includes(index)) {
      setSolidBlocks([...solidBlocks, index]);
    }
    setHoveredBlock(null);
  };

  const handlePlaneHover = (index: number) => {
    setHoveredBlock(index);
  };

  const handlePlaneHoverEnd = () => {
    setHoveredBlock(null);
  };


  

  const handleWireClick = (e:any, index: number) => {
    // return
    if (!solidBlocks.includes(index)) {
    } else {
      e.stopPropagation()
    }
    // setHoveredBlock(null);
  };

  const handleWireHover = (e:any,index: number) => {
    if (!solidBlocks.includes(index)) {
    } else {
      e.stopPropagation()
    }
    // setHoveredBlock(index);
  };

  const handleWireHoverEnd = () => {
    // setHoveredBlock(null);
  };




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
            <Box receiveShadow={!isSolid} castShadow={isSolid}
              args={[1, 1, 1]}
              position={[xPos, yPos, zPos]}
              onClick={(e:any) => handleWireClick(e,index)}
              onPointerOver={(e:any) => handleWireHover(e,index)}
              onPointerOut={handleWireHoverEnd}
            >
              <meshStandardMaterial
                transparent={!isSolid && !isHovered}
                opacity={0.1}
                color={isSolid ? "#777777" : undefined}
              />
            </Box>
            {y === 0 && (
              <Plane castShadow receiveShadow
                args={[1, 1]}
                onClick={() => handlePlaneClick(index)}
                onPointerOver={() => handlePlaneHover(index)}
                onPointerOut={handlePlaneHoverEnd}
                position={[xPos, yPos - 0.5, zPos]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <meshStandardMaterial color="#888888" />
              </Plane>
            )}
          </group>
        );
      })}
    </group>
  );
};

export default GridBlocks;
