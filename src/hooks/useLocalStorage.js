import { useEffect, useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValues, setStoredValues] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValues));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [key, storedValues]);

  return [storedValues,setStoredValues]
};
