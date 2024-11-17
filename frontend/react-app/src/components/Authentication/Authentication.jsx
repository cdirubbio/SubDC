import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Authentication.css";
import { handleLogin, handleRegister, checkAuthentication } from "./Authentication";

export default function Authentication() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [registerCredentials, setRegisterCredentials] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    username: '',
    password: ''
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const resetRegisterFields = () => {
    setRegisterCredentials({
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      username: '',
      password: ''
    });
    setPasswordCriteria({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  };

  const validatePassword = (password) => {
    const criteria = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*]/.test(password),
    };
    setPasswordCriteria(criteria);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setRegisterCredentials({ ...registerCredentials, password });
    validatePassword(password);
  };

  useEffect(() => {
    const token = localStorage.getItem('jsonwebtoken');
    checkAuthentication(token, setLoading, setAuthenticated, null);
  }, [authenticated]);

  useEffect(() => {
    if (authenticated) {
      navigate('/Account');
    }
  }, [authenticated, navigate]);

  if (loading) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="authentication-container">
      <h1>Login Or Register</h1>
      <div className="auth-sections">
        <div className="auth-section login-section">
          <h2>LOGIN</h2>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })}
            placeholder="Enter Username"
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })}
            placeholder="Enter Password"
          />
          <button onClick={() => handleLogin(credentials, setLoading, setAuthenticated)}>Login</button>
        </div>

        <div className="auth-section register-section">
          <h2>REGISTER</h2>
          <input
            type="text"
            value={registerCredentials.first_name}
            name="first_name"
            onChange={(e) => setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value })}
            placeholder="First Name"
          />
          <input
            type="text"
            value={registerCredentials.last_name}
            name="last_name"
            onChange={(e) => setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value })}
            placeholder="Last Name"
          />
          <input
            type="text"
            value={registerCredentials.phone_number}
            name="phone_number"
            onChange={(e) => setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value })}
            placeholder="Phone Number"
          />
          <input
            type="email"
            value={registerCredentials.email}
            name="email"
            onChange={(e) => setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            type="text"
            value={registerCredentials.username}
            name="username"
            onChange={(e) => setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value })}
            placeholder="Username"
            required
          />
          <input
            type="password"
            value={registerCredentials.password}
            name="password"
            onChange={handlePasswordChange}
            placeholder="Password"
            required
          />
          <div className="password-checklist">
            <p className={passwordCriteria.length ? "valid" : "invalid"}>At least 8 characters</p>
            <p className={passwordCriteria.uppercase ? "valid" : "invalid"}>At least one uppercase letter</p>
            <p className={passwordCriteria.lowercase ? "valid" : "invalid"}>At least one lowercase letter</p>
            <p className={passwordCriteria.number ? "valid" : "invalid"}>At least one number</p>
            <p className={passwordCriteria.specialChar ? "valid" : "invalid"}>At least one special character (!@#$%^&*)</p>
          </div>
          <button
            onClick={() => {
              if (Object.values(passwordCriteria).every(Boolean)) {
                handleRegister(registerCredentials, resetRegisterFields);
              }
            }}
            disabled={!Object.values(passwordCriteria).every(Boolean)}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
