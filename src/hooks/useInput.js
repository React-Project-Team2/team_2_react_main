import { useState } from 'react';

const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const onChange = (e) => {
    const {
      target: { value }
    } = e;

    setValue(value);

    if (typeof validator === 'function') {
      setError(!validator(value));
    }
  };

  return { value, onChange, error };
};

export default useInput;
