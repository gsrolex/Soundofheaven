import { useState, useEffect } from "react";

export default function useWindowDimensions() {
  const windowView = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = windowView ? window.innerWidth : null;
    const height = windowView ? window.innerHeight : null;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (windowView) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [windowView]);

  return windowDimensions;
}
