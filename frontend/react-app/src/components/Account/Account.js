import Account from "./Account.jsx";

export const getUserInfo = async (token, setUserInfo) => {
  try {
    const response = await fetch(`${window.BACKEND_URL}/api/userInfo`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    setUserInfo({
      user_id: data.user.user_id || "",
      first_name: data.user.first_name || "",
      last_name: data.user.last_name || "",
      username: data.user.username || "",
      email: data.user.email || "",
      phone_number: data.user.phone_number || "",
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
  }
};

export const getUserListings = async (token, setUserListings) => {
  try {
    const response = await fetch(`${window.BACKEND_URL}/api/user/listings`, {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setUserListings(data);
  } catch (error) {
    console.error("Error fetching user listings:", error);
  }
};


  export const getUserFavorites = async (token, setUserFavorites) => {
    try {
      const response = await fetch(`${window.BACKEND_URL}/api/user/favorites`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      setUserFavorites(data);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
    }
  };
  
export default Account;
