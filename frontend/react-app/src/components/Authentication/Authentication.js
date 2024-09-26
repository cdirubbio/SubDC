import Authentication from "./Authentication.jsx";

export const handleRegister = async (registerCredentials,resetRegisterFields) => {
  if(!verifyStudentEmail(registerCredentials.email)) {
    alert("Only students with a .edu email address are allowed to register");
    return;
  }
  try {
    var response = await fetch(`${window.BACKEND_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerCredentials),
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(
        error.success,
        error.message,
        response.status,
        response.statusText
      );
      alert('Error submitting Registration. Please try again');
      return;
    }
    console.log(response.status);
    response = await response.json();
    console.log(response);
    alert('Registration submitted successfully. Please check your inbox (and spam) for an email from email.subdc@gmail.com in order to verify your email!');
    resetRegisterFields();
  } catch (error) {
    console.error("Error submitting registration, u messed up:", error);
    alert('Error submitting Registration. Please try again');
  }
};

export const verifyStudentEmail = (email) => {
  // i think these are the things allowed in email addresses but idek
    const allwoedEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu)$/;
    return allwoedEmailPattern.test(email);
  }


export const handleLogin = async (credentials, setLoading, setAuthenticated) => {
  try {
    setLoading(true);
    const response = await fetch(`${window.BACKEND_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      const data = await response.json();

      if (data.success === "true") {
        const token = data.token;
        localStorage.setItem("jsonwebtoken", token);
        checkAuthentication(token, setLoading, setAuthenticated)
      }
    } else {
      console.error("Login failed");
      alert('Login Failed. Please try again.');
    }
  } catch (error) {
    console.error("Error submitting login:", error);
  } finally {
    setLoading(false);
  }
};

export const checkAuthentication = async (token, setLoading, setAuthenticated, setUserInfo) => {
  if (!token) {
    setAuthenticated(false);
    setLoading(false);
    return;
  }

  try {
    const response = await fetch(`${window.BACKEND_URL}/api/jwt/auth`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      setAuthenticated(true);
      if (setUserInfo) {
        setUserInfo({user_id: response.user_id || ""});
      }
    } else {
      setAuthenticated(false);
    }
  } catch (error) {
    console.error("Error during grab data:", error);
  } finally {
    setLoading(false);
  }
};

export default Authentication;
