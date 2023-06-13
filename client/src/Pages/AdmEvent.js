import React from "react"
import HeaderAdmin from "./Headerad"
import AdmList from "./AdmList"
import AdmDet from "./AdmDet"
import '../css/admin/AdmEvent.css';

export default function AdmEvent(){
    const userDetail = JSON.parse(sessionStorage.getItem("userDetail"));
  console.log("userDetail:", userDetail);
    return(
        <div className="AdmWeb">
        <HeaderAdmin />
        <div className="AdmPanel">
            <div className="AdmL"><AdmList /></div>
            <div className="AdmD"><AdmDet /></div>
        </div>
    
    
    </div>
    )
}