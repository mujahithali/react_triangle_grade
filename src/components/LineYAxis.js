export default function LineYAxis(props) {
  const triYAxis = props.triYAxisVal ?? 0;
  const triHeight = props.triHeightVal ?? 0;
  const lineYAxis = props.lineYAxisVal ?? 0;
  const lineYAxisSplitVal = lineYAxis
    ? lineYAxis.trim().replace(/\s+/g, "").split(",")
    : [];
  const lineY1AxisInputVal = lineYAxisSplitVal[0];
  const lineY2AxisInputVal =
    lineYAxisSplitVal[1] && Boolean(lineYAxisSplitVal[1])
      ? lineYAxisSplitVal[1]
      : lineYAxisSplitVal[0];
  const isLineY2Avail = lineYAxisSplitVal[1] && Boolean(lineYAxisSplitVal[1]);
  const getYAxis = (yAxis, doGetAxisPerc) => {
    let yAxisVal = -1;
    if (Boolean(yAxis)) {
      if (isNaN(yAxis) && yAxis.length === 1 && yAxis.match(/[a-z]/i)) {
        const alphabetPosition = (char) => {
          return [...char]
            .map((a) => parseInt(a, 36) - 9)
            .filter((a) => a >= 0)[0];
        };

        yAxisVal = (alphabetPosition(yAxis) / 26) * 100;
      } else if (yAxis >= 0 && yAxis <= 100) {
        yAxisVal = yAxis;
      }
    }
    return doGetAxisPerc
      ? yAxisVal
      : triYAxis +
          (triHeight / 100) * (yAxisVal > -1 ? 100 - yAxisVal : yAxisVal);
  };
  return {
    y1: getYAxis(lineY1AxisInputVal),
    y2: getYAxis(isLineY2Avail ? lineY2AxisInputVal : lineY1AxisInputVal),
    iy: getYAxis(lineY1AxisInputVal, true),
    iy1: GetAxisRange(lineY1AxisInputVal),
    iy2: GetAxisRange(isLineY2Avail ? lineY2AxisInputVal : lineY1AxisInputVal),
    isY2Avail: isLineY2Avail,
  };
}

const GetAxisRange = (axis) => {
  let axisVal = "";
  if (
    Boolean(axis) &&
    ((isNaN(axis) && axis.length === 1 && axis.match(/[a-z]/i)) ||
      (axis >= 0 && axis <= 100))
  ) {
    axisVal = axis;
  }
  return axisVal.toString().toUpperCase();
};
