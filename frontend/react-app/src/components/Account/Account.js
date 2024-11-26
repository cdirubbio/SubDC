import Account from "./Account.jsx";

export const getUserInfo = async (token, setUserInfo) => {
  try {
    const response = await fetch(`${window.BACKEND_URL}/api/user/info`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseFromServer = await response.json();
    const data = responseFromServer[0];

    setUserInfo({
      user_id: data.user_id || "",
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      username: data.username || "",
      email: data.email || "",
      phone_number: data.phone_number || "",
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
    const response = await fetch(`${window.BACKEND_URL}/api/user/notifications`, {
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

  export const getUserReservation = async (token, setReservation) => {
    try {
      const response = await fetch(`${window.BACKEND_URL}/api/user/reservation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data && data.listing_id) {
          setReservation(data); // Set reservation if data is valid
        } else {
          setReservation(null); // Clear reservation if no data
        }
      } else {
        setReservation(null); // Clear reservation on error or no data
      }
    } catch (error) {
      console.error("Error fetching reservation:", error);
      setReservation(null);
    }
  };
  

  export const updateUserInfo = async (token, updatedUserInfo) => {
    try {
        const response = await fetch(`${window.BACKEND_URL}/api/user/info`, {
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
