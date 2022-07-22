import { useState, useEffect } from "react";
import WindowDimensions from "../common/WindowDimensions";

export default function TriangleSize(props) {
  const windowDimension = WindowDimensions();
  const [windowSize, setWindowSize] = useState(windowDimension);
  const triXAxis = props.x ?? 0;
  const triYAxis = props.y ?? 0;

  useEffect(() => {
    setWindowSize(windowDimension);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowDimension]);

  const getTriangleSize = () => {
    return (
      (windowSize.innerWidth > windowSize.innerHeight
        ? windowSize.innerHeight
        : windowSize.innerWidth) -
      (triXAxis > triYAxis ? triXAxis : triYAxis) * 2 -
      65
    );
  };

  return getTriangleSize();
}
