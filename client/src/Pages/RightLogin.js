import eye from "../images/eye.png";
import eyecut from "../images/eyecut.png";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import websiteDataService from '../services/website.js';

const RightLogin = () => {
  const [senddata, sendingdata] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Track password visibility state
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSubmitted) {
      fetchUsers();
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  const fetchUsers = () => {
    websiteDataService
      .getUser({ senddata })
      .then((response) => {
        console.log('finally');
        sessionStorage.setItem("userDetail", JSON.stringify(response.data)); // Store the user detail in session storage
        console.log(response.data);
        const role = response.data.role;
        if (role === 'student') {
          navigate('/student');
        } else if (role === 'faculty') {
          navigate('/teacher');
        }else if(role==='admin'){
          navigate('/admin')
        } 
        else {
          navigate('/');
        }
      })
      .catch((e) => {
        setLoginError("Incorrect email or password"); // Set the login error message
      });
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setIsSubmitted(true);
    setLoginError(""); // Clear the login error message
    sendingdata(values);
    setSubmitting(false);
    resetForm();
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Required'),
        password: Yup.string()
          .required('No password provided.')
          .min(8, 'Password is too short - should be 8 chars minimum.')
          .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
      })}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <div className="login-details">
            <div className="login-details-inside">
              <div className="login-type">
                <p className="login-heading">LOGIN</p>
                <div className="login-line"></div>
                <form onSubmit={handleSubmit}>
                  <div className="inputuser">
                    <label htmlFor="email">Email</label>
                    <br />
                    <input
                      name="email"
                      type="text"
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email && "error"} 
                    />
                    <div className="valie">
                      {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}
                    </div>
                    <br />
                  </div>
                  <div className="inputpass">
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"} // Toggle password visibility based on showPassword state
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password && "error"}
                    />
                    <div className="vali">
                      {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                      {loginError && <div className="input-feedback">{loginError}</div>} {/* Display login error message */}
                    </div>
                    <br />
                    <div>
                      <p>Forgot password?</p>
                      <img
                        className="logo"
                        src={showPassword ? eyecut : eye}
                        alt="polygon"
                        onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state on click
                      />
                    </div>
                  </div>
                  <div className="submit">
                    <button className="loginbutton" disabled={isSubmitting}>
                      <div>
                        <p>Login</p>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default RightLogin;
