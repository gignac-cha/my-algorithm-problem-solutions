import { useCallback, useLayoutEffect, useRef } from 'react';

export const useAnimationFrame = (handler: () => void) => {
  const ref = useRef<number>();

  const callback = useCallback(() => {
    ref.current = requestAnimationFrame(callback);
    handler();
  }, [handler]);

  useLayoutEffect(() => {
    ref.current = requestAnimationFrame(callback);
    return () => (ref.current ? cancelAnimationFrame(ref.current) : undefined);
  }, [callback, handler]);
};
