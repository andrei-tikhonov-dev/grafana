import { useEffect, useState, useRef } from 'react';

import { PanelOptions } from '../types';

export const usePluginState = <T extends Record<string, any>>(
  options: PanelOptions,
  onOptionsChange: (options: PanelOptions) => void,
  initialState: T
): [T, (newState: T | ((prevState: T) => T)) => void] => {
  const [state, setState] = useState<T>(() => {
    try {
      if (options.savedState) {
        const parsedState = JSON.parse(options.savedState);

        if (parsedState && typeof parsedState === 'object' && !Array.isArray(parsedState)) {
          const mergedState = { ...initialState } as T;

          for (const key in initialState) {
            if (Object.prototype.hasOwnProperty.call(parsedState, key)) {
              (mergedState as any)[key] = parsedState[key];
            }
          }

          return mergedState;
        }
      }
      return initialState;
    } catch (e) {
      console.error('Error parsing saved state', e);
      return initialState;
    }
  });

  const prevSerializedStateRef = useRef<string>(options.savedState || '');

  useEffect(() => {
    const serializedState = JSON.stringify(state);

    if (serializedState !== prevSerializedStateRef.current) {
      prevSerializedStateRef.current = serializedState;

      onOptionsChange({
        ...options,
        savedState: serializedState,
      });
    }
  }, [state, options, onOptionsChange]);

  return [state, setState];
};
