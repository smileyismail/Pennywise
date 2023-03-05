import { useEffect, useRef } from "react";

const useClickOutside = (handler) => {
  let domNodeRef = useRef();

  useEffect(() => {
    function clickOutside(e) {
      if (!domNodeRef.current.contains(e.target)) {
        handler();
      }
    }
    document.addEventListener("click", clickOutside);

    return () => {
      document.removeEventListener("click", handler);
    };
  });

  return domNodeRef;
};

export default useClickOutside;
