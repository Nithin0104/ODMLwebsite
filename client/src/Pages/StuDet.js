import React, { useState, useEffect } from 'react';
import '../css/StuDet.css';
import '../css/Cal.css';
import websiteDataService from '../services/website.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import approved from "../images/checked.png";
import StuDetData from "./Data";
import StuDetSlab from "./StuDetSlab";

export default function StuDet(props) {
  const [detElements, setDetElements] = useState([]);
  const [datechange, setDateChange] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const userDetail = JSON.parse(sessionStorage.getItem("userDetail"))
  console.log("userDetailroll:", userDetail.rollno);
  useEffect(() => {
    const fetchLeavesByDate = async () => {
      const formattedDate = selectedDate.toLocaleDateString(); // Format the selected date
      console.log("date:", formattedDate);
      try {
        const response = await websiteDataService.getLeaveByDate({ date: formattedDate }); // Call getLeaveByDate with the formatted date
        const leaveData = response.data;
        const detElements = leaveData.map((det) => {
          if (det.rollno === userDetail.rollno) {
            console.log("det:", det);
            return (
              <StuDetSlab title={det.title} reason={det.cause} src={det.status} />
            );
          } else {
            return null; // or any other fallback component or content
          }
        });
        setDetElements(detElements);
      } catch (error) {
        console.log("Error fetching leave data:", error);
      }
    };

    fetchLeavesByDate();
    setDateChange(false);
  }, [datechange]);

  const handleDateChange = (date) => {
    setDateChange(true);
    setSelectedDate(date);
  };

  return (
    <div className="StuDpan">
      <div className="StuDcal">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>
      <div className="StuDeve">
        <div className="eve">
          <div className="evedatetitle">
            <p>DETAILS -------- {selectedDate.toLocaleDateString()}</p>
          </div>
          <div className="eve"></div>
        </div>
        {detElements}
        <div className="detline"></div>
      </div>
    </div>
  );
}
