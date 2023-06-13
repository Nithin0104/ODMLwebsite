import React from "react";
import "../css/teacher/TeaLeaveList.css";
import accept from "../images/checked.png";
import reject from "../images/decline.png";
import websiteDataService from "../services/website.js";

export default function TeaLeaveList(props) {
  console.log("props:", props.data);
  const [username, setUsername] = React.useState("");
  console.log("username:", username);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const abc = { rollno: props.data.rollno };
        console.log("abc:", abc);
        const user = await websiteDataService.getUserName(abc);
        setUsername(user.data);
        console.log("user:", user);
      } catch (error) {
        console.log("Error fetching username:", error);
        setUsername("");
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Adjust the locale as per your requirement
  };

  return (
    <div className="slab">
      <div className="photo">
        <div className="pic"></div>
        <p>{username}</p>
        <p>{props.data.rollno}</p>
      </div>
      <div className="desc">
        <div className="desc1">
          <div className="fit">
            <p>
              <span>Title:</span> {props.data.rollno}
            </p>
          </div>
          <div className="fit">
            <p>
              <span>Cause:</span> <p>{props.data.cause}</p>
            </p>
          </div>
          <div className="fit">
            <p>
              <span>Role:</span> {props.data.sturole}
            </p>
          </div>
          <div className="date">
            <p>
              <span>From:</span> {formatDate(props.data.from)}
            </p>
            <p>
              <span>To:</span> {formatDate(props.data.to)}
            </p>
          </div>
        </div>

        {/* <p>Title: xxxxxxxxxx</p> */}
      </div>
      <div className="decision">
        <div className="dd1">
          <img className="odimgq" src={accept} alt="polygon" />
        </div>
        <div className="dd1">
          <img className="odimgq" src={reject} alt="polygon" />
        </div>
      </div>
    </div>
  );
}
