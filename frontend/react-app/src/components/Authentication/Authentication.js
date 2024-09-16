import Authentication from "./Authentication.jsx";

export const handleRegister = async (registerCredentials,resetRegisterFields) => {
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
    alert('Registration submitted successfully.');
    resetRegisterFields();
  } catch (error) {
    console.error("Error submitting registration, u fuked up:", error);
    alert('Error submitting Registration. Please try again');
  }
};

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

export const checkAuthentication = async (token, setLoading, setAuthenticated) => {
  if (!token) {
    setAuthenticated(false);
    setLoading(false);
    return;
  }

  try {
    const response = await fetch(`${window.BACKEND_URL}/api/jwt/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const user_id = data.user_id;
      localStorage.setItem("user_id", user_id);
      setAuthenticated(true);
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
