import { useState, useRef } from "react";

const useLocalStorage = (key, initialValue) => {
  
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const container = localStorage.getItem("fantagment");
      if (container){
        const item = JSON.parse(container)[key];
        /* console.log("getitem", key, item) */
        return item ? item : initialValue /* problem if item = 0 because 0 == false */
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
      /* console.log("setitem", key, value) */
      setStoredValue(value);
      if (typeof window !== "undefined") {
        const container = localStorage.getItem("fantagment");
        const newContainer = container ? {...JSON.parse(container), [keyRef.current] : value} : {[keyRef.current] : value};
        localStorage.setItem("fantagment", JSON.stringify(newContainer));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
