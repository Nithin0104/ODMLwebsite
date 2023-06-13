import React , { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import calstart from "../images/calstart.png";
import calend from "../images/calend.png";
import eye from "../images/eye.png";

import db from "../images/delete.png";
import edit from "../images/edit.png";

export default function StuListSlab(props) {
    const [isAddVisible, setIsAddVisible] = useState(false);
  const addRef = useRef();
  const fromDate = new Date(props.data.props.from).toLocaleDateString();
  const toDate = new Date(props.data.props.to).toLocaleDateString();

  const handleClick = () => {
    console.log("props.data.props:", props.data.props);
    // Store the props.data.props value in sessionStorage
    sessionStorage.setItem("eventData", JSON.stringify(props.data.props));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addRef.current && !addRef.current.contains(event.target)) {
        setIsAddVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditClick = () => {
    setIsAddVisible(true);
  };

  return (
    <div className="aEventSlab">
      <div className="aEventSp"></div>
      <div className="aEventSdet">
        <div className="aEve1">
          <p>{props.data.props.title}</p>
        </div>
        <div className="aEve2"></div>
        <div className="aEve3">
          <div className="aEve31">
            <p>
              <img className="calsa" src={calstart} alt="polygon" /> {fromDate}
            </p>
          </div>
          <div className="aEve32">
            <p>
              <img className="calen" src={calend} alt="polygon" /> {toDate}
            </p>
          </div>
        </div>
        <div className="aEve4">
          <p>
            <b>ORGANIZER: </b>
            {props.data.props.org}
          </p>
        </div>
        <div className="aEve5">
          <p>
            <b>DEPT:</b> {props.data.props.dept.join(" ")}
          </p>
        </div>
        <div className="aEve6">
          <div className="aEve61">
            <p>
              <b>COUNT:</b> {props.data.props.count}
            </p>
          </div>
          
          
        </div>
        
      </div>
      <div className="aEventopt">
        <div className="aeo"><Link to="/student/eventod" onClick={handleClick}>
        <img className="calsa" src={eye} alt="polygon" />
              </Link></div>
        <div className="aeo"><img className="calsa" src={db} alt="polygon" /></div>
        <div className="aeo"><img className="calsa" src={edit} alt="polygon" onClick={handleEditClick}/></div>
      </div>
      <div className="aeventadd" ref={addRef} style={{ display: isAddVisible ? "block" : "none" }}>
        <form></form>
      </div>
      
    </div>
    
  );
}
