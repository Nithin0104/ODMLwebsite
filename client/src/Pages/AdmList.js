import React, { useState, useEffect, useRef } from "react";
import '../css/admin/AdmList.css';
import calstart from "../images/calstart.png"
import calend from "../images/calend.png"
import add1 from "../images/add.png";
import decline from "../images/decline.png";
import AdmListSlab from "./AdmListSlab";
import websiteDataService from "../services/website.js";
export default function TeaList(){
    const [listElements, setListElements] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [submiting,toSubmit] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const addRef = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const options = ["t1", "t2"];
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const departmentOptions = ["CSE", "Mech", "ECE", "AI", "EEE", "CCE"];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedOptions((prevOptions) => [...prevOptions, option]);
  };
  const handleOptionRemove = (option) => {
    setSelectedOptions((prevOptions) =>
      prevOptions.filter((item) => item !== option)
    );
  };

  const handleDepartmentOptionSelect = (option) => {
    setSelectedDepartments((prevDepartments) => [...prevDepartments, option]);
  };

  const handleDepartmentOptionRemove = (option) => {
    setSelectedDepartments((prevDepartments) =>
      prevDepartments.filter((item) => item !== option)
    );
  };
  

  // ...

  const handle1FormSubmit = async (e) => {
    e.preventDefault();
  
    const userDetail = JSON.parse(sessionStorage.getItem("userDetail"));
    const createdBy = userDetail.rollno;
  
    const eventData = {
      createdby: createdBy,
      eventid: 1,
      from: e.target.elements.from.value,
      managedby: selectedOptions,
      to: e.target.elements.to.value,
      count: selectedDepartments.length,
      dept: selectedDepartments,
      title: e.target.elements.title.value,
      org: e.target.elements.org.value,
    };
  
    try {
      await websiteDataService.putEvent(eventData);
      console.log("Event added successfully");
      // Call the fetchEvents function to refresh the list after adding the event
      fetchEvents();
      setIsAddVisible(false); // Close the popup window
      setTitle(""); // Clear the title input value
      setDate(""); // Clear the date input value
      setSelectedOption(""); // Clear the selected managed by option
      setSelectedOptions([]); // Clear the selected managed by options list
      setSelectedDepartments([]); // Clear the selected departments list
    } catch (error) {
      console.log("Error adding event:", error);
    }
  };

// ...

  
  
  useEffect(() => {
    fetchEvents();
  }, []);
  
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
  

  useEffect(() => {
    if (title !== "" || date !== "") {
      fetchEventsByFilter();
    }
    toSubmit(false)
  }, [submiting]);

  const fetchEvents = async () => {
    try {
      const response = await websiteDataService.getEvents();
      const eventData = response.data;
      setListElements(eventData);
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  const fetchEventsByFilter = async () => {
    try {
      const formattedDate = formatDate(date);
      const abc = {
        title: title || "", // Set title to an empty string if it's falsy (e.g., null or undefined)
        date: formattedDate || "" // Set date to an empty string if it's falsy
      };
      console.log("abc:", abc);
      const response = await websiteDataService.getEventsByFilter(abc);
      const eventData = response.data;
      setListElements(eventData);
      console.log("eventData:", eventData);
      setDate("");
    setTitle("");
    } catch (error) {
      console.log("Error fetching events by filter:", error);
    }
  };

  const listingElements = listElements.map((det) => (
    
    
    <AdmListSlab
  title={det.title}
      org={det.org}
      dept={det.dept}
      from={det.from} // Convert 'from' date to formatted string
      to={det.to} // Convert 'to' date to formatted string
      count={det.count}
      managedby={det.managedby}
      

/>
  ));
  
  
  const formatDate = (date) => {
    if (!date) return ""; // Return an empty string if the date is falsy
  
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };
  

  const handleFormSubmit = (e) => { 
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("submitting", title, date);
    toSubmit(true);
    
  };
    return(
    <div className="aSlist">
    <div className="aShead"><p>EVENTS</p></div>
    <div className="aSline"></div>
    <div className="afilter">
        <form onSubmit={handleFormSubmit}>
          <label >Name:</label>
          <input
            type="text"
            placeholder="Search"
            className="asearchtitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label >Date:</label>
          <input
            type="date"
            className="asearchDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="aEvents">
        {listingElements.map((item, index) => (
          <AdmListSlab key={index} data={item} />
        ))}
      </div>
      <div className="addcol">
      <div className="aAdd" onClick={handleEditClick} >
      <img className="calsa" src={add1} alt="polygon" />
      </div>
      </div>
      <div className="aeventadd" ref={addRef} style={{ display: isAddVisible ? "block" : "none" }}>
        <div className="aeveadd1">
        <form onSubmit={handle1FormSubmit}>
  <label>Title: </label>
  <input type="text" name="title" />

  <label>From date</label>
  <input type="date" name="from" />

  <label>To date</label>
  <input type="date" name="to" />

  <label>Managed by:</label>
  <div className="amanage">
    <select
      value={selectedOption}
      onChange={(e) => handleOptionSelect(e.target.value)}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <div className="mand">
      {selectedOptions.map((option) => (
        <div key={option}>
          <span>{option}</span>
          <img
            className="adec"
            src={decline}
            onClick={() => handleOptionRemove(option)}
          />
        </div>
      ))}
    </div>
  </div>

  <label>Departments:</label>

  <div className="amanage">
    <select
      value={selectedOption}
      onChange={(e) => handleDepartmentOptionSelect(e.target.value)}
    >
      <option value="">Select an option</option>
      {departmentOptions.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    <div className="mand">
      {selectedDepartments.map((option) => (
        <div key={option}>
          <span>{option}</span>
          <img
            className="adec"
            src={decline}
            onClick={() => handleDepartmentOptionRemove(option)}
          />
        </div>
      ))}
    </div>
  </div>

  <label>Organizer: </label>
  <input type="text" name="org" />

  <button type="submit">Submit</button>
</form>
        </div>
      </div>
    </div>
       )
}