import React from "react"
import HeaderAdmin from "./Headeradmin"
import TeaList from "./TeaList"
import TeaDet from "./TeaDet"
import '../css/teacher/TeaEvent.css';
export default function TeaEvent(){
    const userDetail = JSON.parse(sessionStorage.getItem("userDetail"));
  console.log("userDetail:", userDetail);
    return(
    <div className="TeaWeb">
        <HeaderAdmin />
        <div className="TeaPanel">
            <div className="TeaL"><TeaList /></div>
            <div className="TeaD"><TeaDet /></div>
        </div>
    
    
    </div>
       )
}