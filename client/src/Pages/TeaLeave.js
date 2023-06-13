import React, { useState, useEffect } from "react";
import "../css/teacher/TeaLeave.css";
import HeaderAdmin from "./Headeradmin";
import TeaLeaveList from "./TeaLeaveList";
import websiteDataService from "../services/website";

export default function TeaLeave() {
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [leavetype, setLeaveType] = useState("");
  const [rollno, setRollNo] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
  };
 

  useEffect(() => {
    const fetchFilteredLeaves = async () => {
      try {
        const abc = {
          leavetype: leavetype,
          rollno: rollno,
          title: title,
          date: date,
          status: "waiting"
        };
        console.log("abc:", rollno);
        const response = await websiteDataService.getTeaByFilter(abc);
        setFilteredLeaves(response.data)
        console.log("filteredLeaves:", filteredLeaves);
      } catch (error) {
        console.log("Error fetching filtered leave data:", error);
        setFilteredLeaves([]);
      }
    };

    if (submitting) {
      fetchFilteredLeaves();
      setSubmitting(false);
    }
  }, [submitting]);

  return (
    <div className="tlweb">
      <HeaderAdmin />
      <div className="tldiv">
        <div className="tlfilter">
          <div className="tlfil">
            <form className="tlform" onSubmit={handleSubmit}>
              <div className="fill1">
                <input
                  type="radio"
                  id="ch1"
                  name="leaveType"
                  value="od"
                  onChange={(e) => setLeaveType(e.target.value)}
                />
                <label>OD</label>

                <input
                  type="radio"
                  id="ch2"
                  name="leaveType"
                  value="ml"
                  onChange={(e) => setLeaveType(e.target.value)}
                />
                <label>ML</label>

                <input
                  type="radio"
                  id="ch3"
                  name="leaveType"
                  value="cl"
                  onChange={(e) => setLeaveType(e.target.value)}
                />
                <label>CL</label>
              </div>
              <div className="fill">
                <label>Roll No</label>
                <input
                  name="rollNo"
                  value={rollno}
                  onChange={(e) => setRollNo(e.target.value)}
                />
              </div>
              <div className="fill">
                <label>Title</label>
                <input
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="fill">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="fill">
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
        <div className="rightpane">
          {filteredLeaves.map((filteredLeave, index) => (
            <TeaLeaveList key={filteredLeave._id} data={filteredLeave} />
          ))}
        </div>
      </div>
    </div>
  );
}
