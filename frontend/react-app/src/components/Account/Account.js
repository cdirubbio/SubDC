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
export const getUserNotifications = async (token, setUserNotifications) => {
  try {
    const response = await fetch(`${window.BACKEND_URL}/api/userNotifications`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    setUserNotifications(data.notifications);
  } catch (error) {
    console.error("Error fetching user notifications:", error);
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
  

  export const updateUserInfo = async (token, updatedUserInfo) => {
    try {
        const response = await fetch(`${window.BACKEND_URL}/api/userInfo`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedUserInfo),
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        if (response.status == "200") {
          console.log("User Info has been successfully updated");
        }
        const data = await response.json();
    } catch (error) {
      console.error("Error Toggling Favorite: ", error);
    }
  };
  

export default Account;
