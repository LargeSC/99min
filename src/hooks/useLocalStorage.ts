import { useState, useEffect, Dispatch, SetStateAction } from "react";

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [state, setState] = useState<T>(() => {
    try {
      const valueInLocalStorage = window.localStorage.getItem(key);
      if (valueInLocalStorage !== null) {
        return JSON.parse(valueInLocalStorage);
      }
    } catch (err) {
      console.error(`Error reading localStorage key "${key}": ${err}`);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      if (state === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(state));
      }
    } catch (err) {
      console.error(`Error writing to localStorage key "${key}": ${err}`);
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorage;
