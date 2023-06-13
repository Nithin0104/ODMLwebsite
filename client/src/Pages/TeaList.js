import React,{useState,useEffect} from "react"
import '../css/teacher/TeaList.css';
import calstart from "../images/calstart.png"
import calend from "../images/calend.png"
import TeaListSlab from "./TeaListSlab";
import websiteDataService from "../services/website.js";
export default function TeaList(){
    const [listElements, setListElements] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [submiting,toSubmit] = useState(false);
  
  useEffect(() => {
    fetchEvents();
  }, []);
  

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
    
    
    <TeaListSlab
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
    <div className="tSlist">
    <div className="tShead"><p>EVENTS</p></div>
    <div className="tSline"></div>
    <div className="tfilter">
        <form onSubmit={handleFormSubmit}>
          <label >Name:</label>
          <input
            type="text"
            placeholder="Search"
            className="tsearchtitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label >Date:</label>
          <input
            type="date"
            className="tsearchDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="tEvents">
        {listingElements.map((item, index) => (
          <TeaListSlab key={index} data={item} />
        ))}
      </div>
      <div>
            
      </div>

    </div>
       )
}