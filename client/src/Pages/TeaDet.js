import React, { useState, useEffect } from "react";
import "../css/teacher/TeaDet.css";
import search from "../images/search.png";
import group from "../images/Group.png";
import TeaOd from "./TeaOd";
import websiteDataService from "../services/website.js";
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container, Button , Alert} from 'react-bootstrap'; 
export default function TeaDet() {
    const [show, setShow] = useState(true)  
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a value");
      return;
    }

    setIsLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isLoading) {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        const todayFormatted = `${dd}/${mm}/${yyyy}`;
  
        const abc = {
          rollno: inputValue,
          date: "22/05/2023",
        };
  
        try {
          console.log("abc:", abc);
          const response = await websiteDataService.getOdByFilter(abc);
          console.log("response:", response);
  
          setFilteredData(response.data); // Extract 'data' property from 'response'
          console.log("filteredData:", response.data);
        } catch (error) {
          console.log("Error fetching data:", error);
          setFilteredData([]);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchData();
  }, [isLoading]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="TeaDpan">
    
      <div className="TeaDeve">
        <div className="tea1">
          <div className="tea11">
            <input value={inputValue} onChange={handleInputChange} />
          </div>
          <div className="tea12">
            <img className="search" src={search} alt="msg" onClick={handleSearch} />
          </div>
        </div>
        <div className="teach2">
          {isLoading ? (
            <p>Loading...</p>
          ) : filteredData.length > 0 ? (
            <TeaOd leavetype={filteredData} rollno={inputValue}/>
          ) : (
            <p><img className="grp" src={group} alt="msg" /></p>
          )}
        </div>
      </div>
    </div>
  );
}