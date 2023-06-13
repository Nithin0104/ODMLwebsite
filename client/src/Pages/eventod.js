import React, { useEffect, useState } from "react";
import "../css/onduty.css";
import Header from "./Header";
import calstart from "../images/calstart.png";
import calend from "../images/calend.png";
import cause from "../images/cause.png";
import role from "../images/role.png";
import teacher from "../images/teacher.png";
import websiteDataService from '../services/website.js';

export default function OnDuty() {
  const [eventdet, setEventdet] = useState({});
  const [selectedOption, setSelectedOption] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const userDetail = JSON.parse(sessionStorage.getItem("userDetail"));
  const rollno = userDetail.rollno;

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    const eventData = sessionStorage.getItem("eventData");
    setEventdet(JSON.parse(eventData));
    sessionStorage.removeItem("eventData");
  }, []);

  const fromDate = eventdet.from ? new Date(eventdet.from).toISOString().split("T")[0] : "";
  const toDate = eventdet.to ? new Date(eventdet.to).toISOString().split("T")[0] : "";

  const submitForm = async () => {
    setSubmitting(true);

    const formValues = {
      sturole: document.getElementById("role").value,
      cause: document.getElementById("reason").value,
      from: document.getElementById("fromDate").value,
      to: document.getElementById("toDate").value,
      appliedto: selectedOption,
      rollno: rollno,
      status: "pending",
      title: eventdet.title,
      leavetype: "od"
    };

    // Call the putEventOd function with the form values
    const status = await websiteDataService.putEventOd(formValues);
    console.log(status);

    if (status.data.status === "success") {
      alert("Your request has been submitted successfully");
      window.location.href = "/student";
    }

    setSubmitting(false);
  };

  useEffect(() => {
    if (submitting) {
      submitForm();
    }
  }, [submitting]);

  return (
    <div className="odweb">
      <Header />
      <div className="odfull">
        <div className="odhead">
          On Duty for <span style={{ color: "#564FBD", textTransform: "uppercase" }}>{eventdet.title}</span>
        </div>
        <div className="odline"></div>
        <div className="odpanel" style={{ borderColor: "rgb(86, 79, 189,50%)" }}>
          <div className="odform">
            <form className="odinput">
              <div className="odin">
                <img className="odimg" src={role} alt="polygon" />
                <div>
                  <label>Role</label>
                  <input type="text" placeholder="Cause" required id="role" />
                </div>
              </div>
              <div className="odin">
                <img className="odimg1" src={cause} alt="polygon" />
                <div>
                  <label>Reason</label>
                  <input type="text" placeholder="Cause" required id="reason" />
                </div>
              </div>
              <div className="odin">
                <img className="odimg" src={calstart} alt="polygon" />
                <div>
                  <label>From</label>
                  <input style={{ paddingRight: "20px" }} required type="date" placeholder="Cause" id="fromDate" min={fromDate} max={toDate} />
                </div>
              </div>
              <div className="odin">
                <img className="odimg" src={calend} alt="polygon" />
                <div>
                  <label>To</label>
                  <input style={{ paddingRight: "20px" }} required type="date" placeholder="Cause" id="toDate" min={fromDate} max={toDate} />
                </div>
              </div>
              <div className="odin">
                <img className="odimg" src={teacher} alt="polygon" />
                <div>
                  <label>Teacher</label>
                  <select className="odinse" required value={selectedOption} onChange={handleOptionChange}>
                    <option value="">Select an option</option>
                    {eventdet.managedby &&
                      eventdet.managedby.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="odinbutton">
                <button type="button" onClick={() => setSubmitting(true)}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
