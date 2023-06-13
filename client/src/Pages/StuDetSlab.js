import React from "react"
import approved from "../images/checked.png"
import rejected from "../images/decline.png"
import waiting from "../images/return.png"


export default function StuDetSlab(props) {
    let srcImage;
    if (props.src === "accepted") {
      srcImage = approved;
    } else if (props.src === "rejected") {
      srcImage = rejected;
    } else if (props.src === "waiting") {
      srcImage = waiting;
    }
  
    return (
      <div className="detins">
        <div className="detline"></div>
        <div className="titel">
          <p>{props.title}</p>
        </div>
        <div className="tetdet">
          <div className="tet1">
            <p>
              <b>REASON: </b>
              {props.reason}
            </p>
          </div>
          <div className="tet2">
            <img className="calsa" src={srcImage} alt="polygon" />
          </div>
          <div className="button">
            <p>DETAILS</p>
          </div>
        </div>
      </div>
    );
  }
  