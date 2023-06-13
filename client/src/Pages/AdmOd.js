import React, { useEffect, useState } from 'react';
import '../css/admin/AdmOd.css';

import websiteDataService from "../services/website.js";

export default function TeaOd(props) {
  const [username, setUsername] = useState("");
  const [backgroundStyle, setBackgroundStyle] = useState({});
  const [pTagContent, setPTagContent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const abc = { rollno: props.rollno };
        const user = await websiteDataService.getUserName(abc);
        setUsername(user.data);
        console.log("user:", user);
      } catch (error) {
        console.log("Error fetching username:", error);
        setUsername("");
      }
    };

    fetchData();
  }, [props.rollno]);

  useEffect(() => {
    const leavetype = props.leavetype;
    const leaveCounts = leavetype.reduce((counts, type) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});

    const odCount = leaveCounts["od"] || 0;
    const mlCount = leaveCounts["ml"] || 0;
    const clCount = leaveCounts["cl"] || 0;
    const combinedCount = leavetype.length - odCount - mlCount - clCount;

    let bgColor = "";
    let pTagContent = "";

    if (combinedCount === 0) {
      if (odCount === 1 && mlCount === 0 && clCount === 0) {
        bgColor = "#564FBD";
        pTagContent = "ON DUTY";
      } else if (mlCount === 1 && odCount === 0 && clCount === 0) {
        bgColor = "#16A72D";
        pTagContent = "Medical Leave";
      } else if (clCount === 1 && odCount === 0 && mlCount === 0) {
        bgColor = "#FF2E0";
        pTagContent = "Personal Leave";
      }
    } else {
      const colors = [];

      if (odCount > 0) colors.push("#564FBD");
      if (mlCount > 0) colors.push("#16A72D");
      if (clCount > 0) colors.push("#FF2E0");

      bgColor = colors.join(", ");
      pTagContent = `${mlCount > 0 ? "Medical Leave" : ""} ${odCount > 0 ? "ON DUTY" : ""} ${clCount > 0 ? "Personal Leave" : ""}`;

      if (combinedCount > 0) {
        const gradientColors = colors.map(color => `${color} ${100 / (combinedCount + 1)}%`).join(", ");
        bgColor = `linear-gradient(90deg, ${gradientColors}, #D9D9D9 ${100 / (combinedCount + 1)}%)`;
      }
    }

    setBackgroundStyle({ background: bgColor });
    setPTagContent(pTagContent);
    console.log("leaveCounts:", pTagContent);
  }, [username]);

  console.log("leaveCounts:", backgroundStyle);

  return (
    <div className="aoverallq">
      <div className="adm2q">
        <div className="adm21q"></div>
        <div className="adm22q">
          <div>
            <p className="anameq">{username}</p>
          </div>
          <div>
            <p>{props.rollno}</p>
          </div>
          <div className="astatq" style={backgroundStyle}>
            <p>{pTagContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
