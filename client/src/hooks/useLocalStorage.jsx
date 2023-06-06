import { useEffect, useState } from "react";

export const useLocalStorage = () => {
  const [localItems, setLocalItems] = useState("hii");

  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const user = localStorage.getItem("user");

  // get Local Storage items
  const getLocalStorage = (key) => {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : null;
  };

  return { setLocalStorage, getLocalStorage };
};
