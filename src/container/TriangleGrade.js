import React, { useState } from "react";
import TriangleGridline from "../components/TriangleGridline";
import "../assets/css/TriangleGridline.css";

export default function TriangleGrade() {
  const [inputRef] = useState(React.createRef());
  const [lineYAxisInput, setLineYAxisInput] = useState("");
  const getTriangleGridline = () => {
    const lineYAxisInputVal = inputRef.current ?? "";
    setLineYAxisInput(lineYAxisInputVal.value ?? "");
  };

  return (
    <>
      <div id="id_inputContainer">
        <label style={{ marginLeft: "1px" }}>
          Grade should be either between <b>0 to 100</b> (or) <b>A to Z</b>
        </label>
        <br />
        <input
          type="text"
          placeholder="Enter the grade"
          ref={inputRef}
          onInput={getTriangleGridline}
          style={{ width: "90vw" }}
        />
      </div>
      <TriangleGridline yAxis={lineYAxisInput} />
    </>
  );
}
