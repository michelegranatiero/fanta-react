import { useState, useRef } from "react";

const useLocalStorage = (key, initialValue) => {
  
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const container = localStorage.getItem("fanta-draft");
      if (container){
        const item = JSON.parse(container)[key];
        return item ? item : initialValue
      }else{
        return initialValue
      }
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const keyRef = useRef(key);
  const setValue = (value) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        const container = localStorage.getItem("fanta-draft");
        const newContainer = container ? {...JSON.parse(container), [keyRef.current] : value} : {[keyRef.current] : value};
        localStorage.setItem("fanta-draft", JSON.stringify(newContainer));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
