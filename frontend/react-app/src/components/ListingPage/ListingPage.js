import ListingPage from "./ListingPage.jsx";

export const toggleUserFavorite = async (token, listing_id, setIsFavorite) => {
  try {
    const response = await fetch(
      `${window.BACKEND_URL}/api/user/toggleFavorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listing_id: listing_id,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    setIsFavorite(data.isFavorite);
  } catch (error) {
    console.error("Error Toggling Favorite: ", error);
  }
};

export const reserveListing = async (token, listing_id, setIsReserved) => {
  try {
    const response = await fetch(`${window.BACKEND_URL}/api/listing/reserve`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        listing_id: listing_id,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);

    if (data.reservationResult == "reserved") {
      setIsReserved(true);
    } else {
      setIsReserved(false);
    }
  } catch (error) {
    console.error("Error Reserving Listing: ", error);
  }
};

export const fetchListingDetails = async (
  token,
  listing_id,
  setListing,
  setIsFavorite,
  setLoading,
  setError,
  setUser_id,
  setListing_user_id,
  setIsReserved,
  setPermissions,
  setShowAddress
) => {
  try {
    const response = await fetch(
      `${window.BACKEND_URL}/api/listing/${listing_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    setUser_id(data.user_id);
    setListing_user_id(data.listing_user_id);

    setListing(data);
    setIsFavorite(data.isFavorite);
    setLoading(false);
    if (data.reserved_by) {
      // Allow access if the current user is the one who reserved it or owns the listing
      if (
        data.reserved_by === data.user_id ||
        data.user_id === data.listing_user_id
      ) {
        setIsReserved(true);
        setPermissions(true);
        setShowAddress(true);
      } else {
        // Deny access if the listing is reserved by someone else
        setIsReserved(true);
        setPermissions(false);
      }
    } else {
      // If the listing is not reserved, allow anyone to view it
      setIsReserved(false);
      setPermissions(true);
    }
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
};

export function apartmentTypeConverter(apt_type) {
  if (apt_type === "studio") {
    return "Studio";
  } else if (apt_type === "1br") {
    return "1-Bedroom Apartment";
  } else if (apt_type === "2br") {
    return "2-Bedroom Apartment";
  }
}
export const formatDateToReadable = (dateString) => {
  const [year, month, day] = dateString.split("-");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[parseInt(month, 10) - 1];
  return `${monthName} ${parseInt(day, 10)}, ${year}`;
};

export const updateListingInformation = async (
  token,
  listing_id,
  updatedListingInfo
) => {
  try {
    const response = await fetch(
      `${window.BACKEND_URL}/api/listing/${listing_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedListingInfo),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (response.status === 200) {
      console.log("Listing Info has been successfully updated");
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error updating listing info: ", error);
  }
};

export const deleteListing = async (token, listing_id) => {
  try {
    const response = await fetch(
      `${window.BACKEND_URL}/api/listing/${listing_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    if (response.status === 200) {
      console.log("Listing Info has been successfully deleted");
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error updating listing info: ", error);
  }
};

export default ListingPage;
