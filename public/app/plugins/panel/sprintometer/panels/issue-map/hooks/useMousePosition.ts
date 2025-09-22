import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ mouseX: 0, mouseY: 0 });

  useEffect(() => {
    const updateMousePosition = debounce((e: MouseEvent) => {
      setMousePosition({ mouseX: e.clientX, mouseY: e.clientY });
    }, 10);

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return mousePosition;
}
