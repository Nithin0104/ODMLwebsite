import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../images/logo.png";
import msg from "../images/message.png";
import { useNavigate } from 'react-router-dom';
import profile from "../images/exit.png";
import "../css/header.css";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userDetail");
    navigate('/')
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header>
      <div className="headLeft">
        <div className="hl1">
          <Link to="/student">
            <img className="headlogo" src={logo} alt="polygon" />
          </Link>
        </div>
        {/* <div className="hl2">Welcome back, <span>{props.user.username}</span></div> */}
      </div>
      <div className="headRight">
        <div className="link1">
          <Link
            to="/student/onduty"
            style={{ color: "#FFFFFF", textDecoration: "none" }}
          >
            <p>ON DUTY</p>
          </Link>
        </div>
        <div className="link2">
          <Link
            to="/student/ml"
            style={{ color: "#FFFFFF", textDecoration: "none" }}
          >
            <p>MEDICAL</p>
          </Link>
        </div>
        <div className="link3">
          <Link
            to="/student/cl"
            style={{ color: "#FFFFFF", textDecoration: "none" }}
          >
            <p>CASUAL</p>
          </Link>
        </div>
        <div className="link4">
          <img className="msg" src={msg} alt="msg" />
        </div>
        <div className="link5" ><Link to="/">
          <img onClick={handleLogout} className="profile" src={profile} alt="profile" />
          </Link>
        </div>
      </div>
    </header>
  );
}
