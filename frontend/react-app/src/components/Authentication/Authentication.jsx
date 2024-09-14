import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import "./Authentication.css";

export default function Authentication() {
  const navigate = useNavigate();  // For redirecting
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
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


  const handleRegister = async () => {
    try {
      var response = await fetch(`${window.BACKEND_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerCredentials),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log(error.success, error.message, response.status, response.statusText);
        return;
      }
      console.log(response.status);
      response = await response.json();
      console.log(response);
      resetRegisterFields();
    } catch (error) {
      console.error("Error submitting registration, u fuked up:", error);
    }
  };
  const resetRegisterFields = () => {
    setRegisterCredentials({
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      username: '',
      password: ''
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('jsonwebtoken');
    checkAuthentication(token);
  }, [authenticated]);


  const checkAuthentication = async (token) => {
    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${window.BACKEND_URL}/api/jwt/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAuthenticated(true);
        setUserInfo(data.user);
        navigate('/Account')
      } else {
        setAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during grab data:", error);
    } finally {
      setLoading(false);
    }
  };


  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${window.BACKEND_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success === 'true') {
          const token = data.token;
          localStorage.setItem('jsonwebtoken', token);
          setAuthenticated(true);
          setUserInfo(data.user);
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error submitting login:", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (authenticated && userInfo) {
    navigate('/Account');
    return;
  }

  return (
    <div className="authentication-container">
      <h1>Login Or Register</h1>
      <div className="auth-sections">
        <div className="auth-section login-section">
          <h2>Login</h2>
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
          <button onClick={handleLogin}>Login</button>
        </div>

        <div className="auth-section register-section">
          <h2>Register</h2>
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
          />
          <input
            type="text"
            value={registerCredentials.username}
            name="username"
            onChange={(e) => setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value })}
            placeholder="Username"
          />
          <input
            type="password"
            value={registerCredentials.password}
            name="password"
            onChange={(e) => setRegisterCredentials({ ...registerCredentials, [e.target.name]: e.target.value })}
            placeholder="Password"
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    </div>
  );
}

