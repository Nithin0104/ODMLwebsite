import React, { useRef } from "react";
import CountUp from "react-countup";

export default function Counter({ number, title }) {
  // useRef usage
  const ref = useRef(null);

  return (
    <div className="number">
      <CountUp ref={ref} end={number} duration={10} />
      <span>{title}</span>
    </div>
  );
}
