import { useEffect, useState, useRef } from 'react';

export const useParentWidth = (initialWidth = 150) => {
  const ref = useRef<HTMLDivElement>(null);
  const [parentWidth, setParentWidth] = useState<number>(initialWidth);

  useEffect(() => {
    if (ref.current) {
      const parentParentElement = ref.current.parentElement?.parentElement;
      const width = Number.parseInt(String(parentParentElement?.style.width), 10);
      if (!isNaN(width)) {
        setParentWidth(width);
      }
    }
  }, [ref]);

  return { parentWidth, ref };
};
