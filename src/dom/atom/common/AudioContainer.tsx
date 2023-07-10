import { useEffect, useRef, RefObject, useState } from 'react';


interface AudioContainerProps {
  s__src: (newSrc: string) => void;
  src: string;
}
function AudioContainer({ s__src, src }: AudioContainerProps) {
  const [counter, s__counter] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioSourceChange: any = (audioElement: any, newSrc: string, playAudio: any) => {
    if (!audioElement) {
      return 
    }
    audioElement?.pause();
    audioElement.src = newSrc;
    playAudio();
    return newSrc
  };
  useEffect(() => {
    s__counter(counter + 1)
    const audioElement: any = audioRef.current;
    if (counter < 1) {
      if (!!audioElement) return
      audioElement.volume = 0.1;
      return 
    }

    const playAudio = () => {
      audioElement?.play();
    };

    s__src(handleAudioSourceChange(audioElement, src, playAudio));

    return () => {
      audioElement?.pause();
      audioElement.src = '';
    };
  }, [src]);

  return <audio ref={audioRef} src={src} />;
}

export default AudioContainer;