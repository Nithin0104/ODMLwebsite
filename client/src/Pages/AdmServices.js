import React, { useState } from "react";
import HeaderAdmin from "./Headerad";
import "../css/admin/AdmService.css";
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";

export default function AdmEvent() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "",
    email: "",
    rollno: "",
  });
  const [tableData, setTableData] = useState([
    {
      username: "Sarvesh",
      password: "password3",
      role: "faculty",
      email: "sarvesh@office.com",
      rollno: "t2",
    },
    // Add more data objects for additional rows
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTableData((prevTableData) => [...prevTableData, formData]);
    setFormData({
      username: "",
      password: "",
      role: "",
      email: "",
      rollno: "",
    });
    setShowAddForm(false);
  };

  const handlePopupClick = (e) => {
    if (e.target.classList.contains("popup")) {
      setShowAddForm(false);
    }
  };

  return (
    <div className="Ser">
      <HeaderAdmin />

      <div className="Rfull">
        <div className="Rleft">
          <div className="Rl1">
            <div className="Rl11">
                <div className="Rl11h">
                    STUDENTS
                </div>
                <div className="number">
                    number
                </div>
            </div>
            <div className="Rl11">
            <div className="Rl11h">
                    TEACHERS
                </div>
                <div className="number">
                    number
                </div>
            </div>
            <div className="Rl11">
            <div className="Rl11h">
                    ADMIN
                </div>
                <div className="number">
                    number
                </div>
            </div>
            <div className="Rl14"></div>
          </div>
          <div className="Rl2">
            <div className="Rl21">
              <div className="Rl211">
                <span>Student</span>
              </div>
              <div className="Rl211">
                <span>Teachers</span>
              </div>
              <div className="Rl211">
                <span>Admins</span>
              </div>
            </div>
            <div className="Rl22">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Roll No</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.password}</td>
                      <td>{item.role}</td>
                      <td>{item.email}</td>
                      <td>{item.rollno}</td>
                      <td>
                        <button>Edit</button>
                        <button>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="Rl23">
                <button onClick={handleAddClick}>Add</button>
              </div>
            </div>
          </div>
        </div>
        <div className="Rright">
          <div className="Rr1">
            <Chart1 />
          </div>
          <div className="Rr1">
            <Chart2 />
          </div>
          <div className="Rr2"></div>
        </div>
      </div>

      {showAddForm && (
        <div className="popup" onClick={handlePopupClick}>
          <div className="popup-content">
            <h2>Add New Row</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Password:
                <input
                  type="text"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Role:
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  <option value="">Select Role</option>
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Roll No:
                <input
                  type="text"
                  name="rollno"
                  value={formData.rollno}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
