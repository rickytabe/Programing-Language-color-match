import { useCallback, useRef } from 'react';

export const useSound = () => {
  const successAudio = useRef(new Audio('/success.mp3'));
  const failureAudio = useRef(new Audio('/failure.mp3'));

  const playSuccessSound = useCallback(() => {
    const audio = successAudio.current;
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn('Audio playback failed:', error);
    });
  }, []);

  const playFailureSound = useCallback(() => {
    const audio = failureAudio.current;
    audio.currentTime = 0;
    audio.play().catch(error => {
      console.warn('Audio playback failed:', error);
    });
  }, []);

  return {
    playSuccessSound,
    playFailureSound
  };
};