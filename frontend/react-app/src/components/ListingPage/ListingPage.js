import ListingPage from "./ListingPage.jsx";

export const toggleUserFavorite = async (token, listing_id, setIsFavorite) => {
    try {
        const response = await fetch(`${window.BACKEND_URL}/api/user/toggleFavorite`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
             listing_id: listing_id
            }),
        });
    
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Favorite status:", data.isFavorite);
        setIsFavorite(data.isFavorite); 
    } catch (error) {
      console.error("Error Toggling Favorite: ", error);
    }
  };


  export const fetchListingDetails = async (token, listing_id, setListing, setIsFavorite, setLoading, setError, setUser_id) => {
    try {
        const response = await fetch(`${window.BACKEND_URL}/api/listing/${listing_id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser_id(data.user_id);

        const formattedData = {
            ...data,
            availability_start: new Date(data.availability_start).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            availability_end: new Date(data.availability_end).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        };
        setListing(formattedData);
        setIsFavorite(data.isFavorite);
        setLoading(false);
    } catch (error) {
        setError(error.message);
        setLoading(false);
    }
};

export function apartmentTypeConverter(apt_type) {
    if (apt_type === "studio") {
        return "Studio";
    }
    else if (apt_type === "1br") {
        return "1-Bedroom Apartment"
    }
    else if (apt_type === "2br") {
        return "2-Bedroom Apartment"
    }
}

export default ListingPage;