import React from "react";
import { Link } from "react-router-dom";
import calstart from "../images/calstart.png";
import calend from "../images/calend.png";

export default function StuListSlab(props) {
  const fromDate = new Date(props.data.props.from).toLocaleDateString();
  const toDate = new Date(props.data.props.to).toLocaleDateString();

  const handleClick = () => {
    console.log("props.data.props:", props.data.props);
    // Store the props.data.props value in sessionStorage
    sessionStorage.setItem("eventData", JSON.stringify(props.data.props));
  };

  return (
    <div className="tEventSlab">
      <div className="tEventSp"></div>
      <div className="tEventSdet">
        <div className="tEve1">
          <p>{props.data.props.title}</p>
        </div>
        <div className="tEve2"></div>
        <div className="tEve3">
          <div className="tEve31">
            <p>
              <img className="calsa" src={calstart} alt="polygon" /> {fromDate}
            </p>
          </div>
          <div className="tEve32">
            <p>
              <img className="calen" src={calend} alt="polygon" /> {toDate}
            </p>
          </div>
        </div>
        <div className="tEve4">
          <p>
            <b>ORGANIZER: </b>
            {props.data.props.org}
          </p>
        </div>
        <div className="tEve5">
          <p>
            <b>DEPT:</b> {props.data.props.dept.join(" ")}
          </p>
        </div>
        <div className="tEve6">
          <div className="tEve61">
            <p>
              <b>COUNT:</b> {props.data.props.count}
            </p>
          </div>
          <div className="tEve62">
            <Link to="/student/eventod" onClick={handleClick}>
              <p>
                <b>View</b>
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
