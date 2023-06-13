import React,{useState} from "react"
import logo from "../images/logo.png"
import msg from "../images/message.png"
import profile from "../images/exit.png"
import '../css/header.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

    export default function HeaderAdmin() {
        const [showDropdown, setShowDropdown] = useState(false);
        const navigate = useNavigate();
      
        const handleLogout = () => {
          sessionStorage.removeItem("userDetail");
          navigate('/')
        };
      
        const toggleDropdown = () => {
          setShowDropdown(!showDropdown);
        };
      
    return(
        <header>
        <div className="headLeft">
            <div className="hl1"><Link to="/adnin"><img className="headlogo" src={logo} alt="polygon" /></Link></div>
            {/* <div className="hl2">Welcome back, <span>{props.user.username}</span></div> */}
        </div>
        <div className="headRight">
        <div className="link1"></div>
            <div className="link2"><Link to="/admin/services" style={{ color: '#FFFFFF', textDecoration: 'none' }}><p>SERVICES</p></Link></div>
            
            
            <div className="link4"><img className="msg" src={msg} alt="msg" /></div>
            <div className="link5" ><Link to="/">
          <img onClick={handleLogout} className="profile" src={profile} alt="profile" />
          </Link>
        </div>
        </div>
        </header>

    )

}

