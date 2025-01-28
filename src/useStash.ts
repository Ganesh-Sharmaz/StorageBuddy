import { useState, useEffect } from 'react';
import Stash from './stash';
import { StashOptions } from './types';

const useStash = (key: string, defaultValue: any, options: StashOptions = { type: 'local' }) => {
  const [value, setValue] = useState(() => {
    const storedValue = Stash.get(key, options);
    return storedValue !== null ? storedValue : defaultValue;
  });

  useEffect(() => {
    Stash.set(key, value, options);
  }, [key, value, options]);

  return [value, setValue];
};

export default useStash;
