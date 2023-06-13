import React from 'react';
import Header from "./Header";
import StuList from "./StuList";
import StuDet from "./StuDet";
import '../css/StuEvent.css';

export default function StuEvent() {
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail"));
  console.log("userDetail:", userDetail);

  return (
    <div className="StuWeb">
      <Header  />
      <div className="StuPanel">
        <div className="StuL"><StuList  /></div>
        <div className="StuD"><StuDet  /></div>
      </div>
    </div>
  );
}
