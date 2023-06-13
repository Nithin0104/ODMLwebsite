import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserProvider } from './Pages/UserContext';
import Login from './Pages/Login';
import StuEvent from './Pages/StuEvent';
import TeaEvent from './Pages/TeaEvent';
import AdmEvent from './Pages/AdmEvent';
import AdmServices from './Pages/AdmServices';
import TeaLeave from './Pages/TeaLeave';
import Notification from './Pages/Notification';
import OnDuty from './Pages/onduty';
import Eventod from './Pages/eventod';
import Ml from './Pages/ml';
import Classleave from './Pages/Classleave';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
// const navigate = useNavigate();
root.render(
  <UserProvider>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/student" element={<StuEvent/>}/>
      <Route path="/student/notification" element={<Notification/>}/>
      <Route path="/student/onduty" element={<OnDuty/>}/>
      <Route path="/student/eventod" element={<Eventod/>}/>
      <Route path="/student/ml" element={<Ml/>}/>
      <Route path="/student/cl" element={<Classleave/>}/>
      <Route path="/teacher" element={<TeaEvent/>}/>
      <Route path="/teacher/tealeave" element={<TeaLeave/>}/>
      <Route path="/admin" element={<AdmEvent/>}/>
      <Route path="/admin/services" element={<AdmServices/>}/>
      navigate("/")
    </Routes>
  </BrowserRouter>
</UserProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

