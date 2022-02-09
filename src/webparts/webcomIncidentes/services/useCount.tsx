import { useState, useEffect } from 'react';

export default function useCount(lenght?: number) {
  const [count, setCount] = useState(0);

  const reset = () => {
    setCount(0);
  };
  const increment = () => {
    if (count == lenght) {
      reset();
    } else {
      setCount(count + 1);
    }
  };
  const decrement = () => {
    if (count == 0) {
      setCount(length);
    } else {
      setCount(count - 1);
    }
  };
  return {
    count,
    increment,
    decrement,
    reset,
  };
}
