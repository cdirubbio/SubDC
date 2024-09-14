import Account from "./Account.jsx";

export const getUserInfo = async (id, setUserInfo) => {
    try {
      const response = await fetch(`${window.BACKEND_URL}/api/userInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: id }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
  
      setUserInfo({
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
  
  export const getUserListings = async (id, setUserListings) => {
    try {
      const response = await fetch(`${window.BACKEND_URL}/api/user/${id}/listings`);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      setUserListings(data);
    } catch (error) {
      console.error("Error fetching user listings:", error);
    }
  };
  
export default Account;