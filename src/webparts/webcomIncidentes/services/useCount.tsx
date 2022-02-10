import { AnimationClassNames } from '@fluentui/react';
import { useState, useEffect } from 'react';

export default function useCount(length?: number) {
  const [count, setCount] = useState<number>(0);
  const reset = () => {
    setCount(0);
  };
  const increment = () => {
    if (count >= length - 1) {
      reset();
    } else {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count == 0) {
      setCount(length - 1);
    } else {
      setCount(count - 1);
    }
  };
  return {
    count,
    increment,
    decrement,
  };
}
