import React, { useState, useEffect, useRef } from "react";
import TriangleSize from "../components/TriangleSize";
import TriangleHeight from "../components/TriangleHeight";
import LineYAxis from "../components/LineYAxis";
import { UncontrolledReactSVGPanZoom } from "react-svg-pan-zoom";
import { checkIntersection } from "line-intersect";
import svg from "save-svg-as-png";

export default function TriangleGridline(props) {
  const [triXAxis] = useState(20);
  const [triYAxis] = useState(20);
  const getTriangleSize = TriangleSize({ x: triXAxis, y: triYAxis });
  const [triSize, setTriSize] = useState(getTriangleSize);
  const triHeight = TriangleHeight({ size: triSize });
  const lineWidth = triSize + triXAxis * 2;
  const lineYAxisVal = LineYAxis({
    triYAxisVal: triYAxis,
    triHeightVal: triHeight,
    lineYAxisVal: props.yAxis,
  });
  const [lineYAxis, setLineYAxis] = useState(lineYAxisVal);

  const intersectingPt1 = checkIntersection(
    triXAxis,
    triYAxis + triHeight,
    triXAxis + triSize / 2,
    triYAxis,
    0,
    lineYAxis.y1,
    lineWidth,
    lineYAxis.y2
  );

  const intersectingPt2 = checkIntersection(
    triXAxis + triSize,
    triYAxis + triHeight,
    triXAxis + triSize / 2,
    triYAxis,
    0,
    lineYAxis.y1,
    lineWidth,
    lineYAxis.y2
  );

  const Viewer = useRef(null);
  const svgZoomIn = () => Viewer.current.zoomOnViewerCenter(1.1);
  const svgZoomOut = () => Viewer.current.zoomOnViewerCenter(0.9);
  const svgReset = () => Viewer.current.reset();

  useEffect(() => {
    Viewer.current.fitToViewer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTriSize(getTriangleSize);

    if (lineYAxis !== lineYAxisVal) {
      setLineYAxis(lineYAxisVal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getTriangleSize, props.yAxis]);

  const downloadSvgAsPng = () => {
    svg.saveSvgAsPng(
      document.querySelector(".svgContainer svg:first-of-type"),
      "triangle_grid_svg.png"
    );
  };

  return (
    <>
      <div className="svgZoomBtnContainer">
        <button className="btn" onClick={svgZoomIn}>
          Zoom In
        </button>
        <button className="btn" onClick={svgZoomOut}>
          Zoom Out
        </button>
        <button className="btn" onClick={svgReset}>
          Reset
        </button>
        <button className="btn" onClick={downloadSvgAsPng}>
          Download svg
        </button>
      </div>
      <div className="svgTopContainer">
        <div className="svgContainer">
          <UncontrolledReactSVGPanZoom
            ref={Viewer}
            width={lineWidth}
            height={triYAxis * 2 + triHeight}
            detectWheel={false}
            detectAutoPan={false}
          >
            <svg
              width={lineWidth}
              height={triYAxis * 2 + triHeight}
              style={{
                backgroundSize: `${lineWidth}px ${triYAxis * 2 + triHeight}px`,
              }}
            >
              <g
                fill="#d4e7ff"
                stroke="#d4e7ff"
                strokeWidth={5}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon
                  points={`
              ${triXAxis}, 
              ${triYAxis + triHeight}, 
              ${triXAxis + triSize}, 
              ${triYAxis + triHeight},
              ${triXAxis + triSize / 2}, 
              ${triYAxis}`}
                />
              </g>
              {intersectingPt1 &&
                intersectingPt2 &&
                intersectingPt1.type === "intersecting" &&
                intersectingPt2.type === "intersecting" &&
                intersectingPt1.point &&
                intersectingPt2.point && (
                  <g
                    fill="#54a0ff"
                    stroke="#54a0ff"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon
                      points={`
              ${triXAxis}, 
              ${triYAxis + triHeight}, 
              ${triXAxis + triSize}, 
              ${triYAxis + triHeight},
              ${intersectingPt2.point.x}, 
              ${intersectingPt2.point.y},
              ${intersectingPt1.point.x}, 
              ${intersectingPt1.point.y}`}
                    />
                  </g>
                )}
              {lineYAxis.y1 >= triXAxis && (
                <g stroke="#243d42" strokeWidth={5} strokeLinecap="round">
                  <line
                    x1={triXAxis / 2}
                    y1={lineYAxis.y1}
                    x2={lineWidth - triXAxis / 2}
                    y2={lineYAxis.y2}
                  />
                </g>
              )}
              {lineYAxis.iy1 && (
                <g fill="black">
                  {!lineYAxis.isY2Avail && (
                    <text
                      x={lineWidth / 2 + lineWidth / 4}
                      y={triHeight / 4}
                      className="svgGradeTxt"
                    >
                      Grade: {lineYAxis.iy1}
                    </text>
                  )}
                  {lineYAxis.isY2Avail && (
                    <text
                      x={lineWidth / 2 + lineWidth / 4}
                      y={triHeight / 4}
                      className="svgGradeTxt"
                    >
                      y1-axis:{lineYAxis.iy1}, y2-axis:
                      {lineYAxis.iy2}
                    </text>
                  )}
                </g>
              )}
              Sorry, your browser does not support inline SVG.
            </svg>
          </UncontrolledReactSVGPanZoom>
        </div>
      </div>
    </>
  );
}
