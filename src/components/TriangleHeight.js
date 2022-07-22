export default function TriangleHeight(props) {
  const triSize = props.size;
  const triSide = (triSize * 3) / 2;
  const triArea = Math.sqrt(
    triSide * (triSide - triSize) * (triSide - triSize) * (triSide - triSize)
  );

  return (2 * triArea) / triSize;
}
