import { useState, useEffect } from "react";

const getWindowDimensions = () => {
  const { innerWidth, innerHeight } = window;

  return {
    innerWidth,
    innerHeight,
  };
};

export default function WindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowDimensions;
}
