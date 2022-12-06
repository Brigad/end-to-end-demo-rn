import {useRef, useEffect} from 'react';

const usePrevious = <ValueType>(value: ValueType) => {
  const ref = useRef<ValueType | undefined>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
