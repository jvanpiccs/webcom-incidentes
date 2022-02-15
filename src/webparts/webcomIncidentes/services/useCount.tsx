import { AnimationClassNames } from '@fluentui/react';
import { useState } from 'react';

export default function useCount(length?: number) {
  const [count, setCount] = useState<number>(0);
  const [transitionClass, setTransitionClass] = useState<string>();
  const reset = () => {
    setCount(0);
  };
  const increment = () => {
    setTransitionClass(AnimationClassNames.slideRightOut40);
    setTimeout(() => {
      setTransitionClass(AnimationClassNames.slideRightIn40);
      if (count >= length - 1) {
        setCount(0);
      } else {
        setCount(count + 1);
      }
    }, 40);
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
    transitionClass,
  };
}
