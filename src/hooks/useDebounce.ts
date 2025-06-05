import { useState, useEffect } from "react";

const useDebouncedInput = (input: string, delay: number): string => {
  const [debouncedInput, setDebouncedInput] = useState<string>(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, delay);

    return () => clearTimeout(handler);
  }, [input, delay]);

  return debouncedInput;
};

export default useDebouncedInput;
