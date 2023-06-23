import { useEffect, useState } from "react";

const usePaddlePosition = (initialPosition:any) => {
  const [position, setPosition] = useState(initialPosition);

  const handleMouseMove = (event:any) => {
    const clientX = event.x / window.innerHeight;
    const newPosition = position.clone();
    newPosition.x = clientX * 1000;
    setPosition(newPosition);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return position;
};
