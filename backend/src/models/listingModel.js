const express = require("express");
const db = require("../database/db");

module.exports = {
  queryAllListings: () => {
    const sql =
      "SELECT listing_id, title, description, apt_type, zip_code, image1, image2, price FROM Listings WHERE reserved_by IS NULL";
    const result = db
      .promise()
      .query(sql)
      .then(([result]) => result)
      .catch(console.log);
    return result;
  },
  queryListingInfo: async (listing_id, user_id) => {
    let sql;
    let queryParams;

    if (user_id) {
      sql = `
          SELECT l.listing_id, l.user_id AS listing_user_id, l.title, l.address, l.description, l.apt_type, l.zip_code, l.price, l.availability_start, l.availability_end, l.reserved_by, l.image1, l.image2,
                 IFNULL(f.isFavorite, 0) AS isFavorite
          FROM Listings l
          LEFT JOIN (
            SELECT listing_id, 1 AS isFavorite
            FROM Favorites
            WHERE user_id = ?
          ) f ON l.listing_id = f.listing_id
          WHERE l.listing_id = ?
        `;
      queryParams = [user_id, listing_id];
    } else {
      sql = `
          SELECT l.listing_id, l.user_id AS listing_user_id, l.title, l.description, l.apt_type, l.zip_code, l.price, l.availability_start, l.availability_end, l.image1, l.image2,
                 0 AS isFavorite
          FROM Listings l
          WHERE l.listing_id = ?
        `;
      queryParams = [listing_id];
    }
    const result = await db
      .promise()
      .query(sql, queryParams)
      .then(([result]) => result)
      .catch(console.log);

    if (user_id) {
      if (
        result.reserved_by &&
        result.reserved_by !== user_id &&
        result.user_id !== user_id
      ) {
        return { message: "You do not have permission to view this listing" };
      }
    }
    return result[0];
  },
  createListing: async (listingData) => {
    const sql = `
    INSERT INTO Listings 
    (user_id, title, description, apt_type, price, address, zip_code, availability_start, availability_end, image1, image2, reserved_by) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NULL)
  `;

    try {
      const [result] = await db
        .promise()
        .query(sql, [
          listingData.user_id,
          listingData.title,
          listingData.description,
          listingData.apt_type,
          listingData.price,
          listingData.address,
          listingData.zip_code,
          listingData.availability_start,
          listingData.availability_end,
          listingData.image1Url,
          listingData.image2Url,
        ]);
        console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      console.error("Error creating listing:", err);
      throw new Error("Error inserting new listing into database");
    }
  },

  getListingOwner: (listing_id) => {
    const sql = "SELECT user_id FROM Listings WHERE listing_id = ?";
    return db
      .promise()
      .query(sql, [listing_id])
      .then(([result]) => result[0])
      .catch((err) => {
        console.error(err);
        throw new Error("Error fetching listing owner");
      });
  },
  getListingOwnerAndImages: (listing_id) => {
    const sql =
      "SELECT user_id, image1, image2 FROM Listings WHERE listing_id = ?";
    return db
      .promise()
      .query(sql, [listing_id])
      .then(([result]) => result[0])
      .catch((err) => {
        console.error(err);
        throw new Error("Error fetching listing owner and images");
      });
  },
  updateListing: (
    listing_id,
    title,
    description,
    apt_type,
    price,
    availability_start,
    availability_end
  ) => {
    const sql = `
      UPDATE Listings
      SET title = ?, description = ?, apt_type = ?, price = ?, availability_start = ?, availability_end = ?
      WHERE listing_id = ?;
    `;
    return db
      .promise()
      .query(sql, [
        title,
        description,
        apt_type,
        price,
        availability_start,
        availability_end,
        listing_id,
      ])
      .then(([result]) => result)
      .catch((err) => {
        console.error(err);
        throw new Error("Error updating listing");
      });
  },
  deleteListing: async (listing_id) => {
    const sql = "DELETE FROM Listings WHERE listing_id = ?";

    try {
      const [result] = await db.promise().query(sql, [listing_id]);
      return result;
    } catch (err) {
      console.error("Error deleting listing:", err);
      throw new Error("Error deleting listing from database");
    }
  },
  updateReservation: async (owner_user_id, listing_id, user_id) => {
    const checkUserReservationSql = `
      SELECT * FROM ReservedListings 
      WHERE user_id = ? AND listing_id != ?
    `;
    const checkReservationSql = `
      SELECT * FROM ReservedListings 
      WHERE listing_id = ?
    `;
    const createReservationSql = `
      INSERT INTO ReservedListings 
      (owner_user_id, user_id, listing_id) 
      VALUES (?, ?, ?)
    `;
    const updateListingReserveSql = `
      UPDATE Listings SET reserved_by = ? WHERE listing_id = ?
    `;
    const createNotificationSql = `
      INSERT INTO UserNotifications 
      (owner_user_id, user_id, listing_id, listing_action, visible) 
      VALUES (?, ?, ?, 'reserve', true)
    `;
    const deleteReservationSql = `
      DELETE FROM ReservedListings 
      WHERE listing_id = ?
    `;
    const clearListingReserveSql = `
      UPDATE Listings SET reserved_by = NULL WHERE listing_id = ?
    `;
    const createUnreserveNotificationSql = `
      INSERT INTO UserNotifications 
      (owner_user_id, user_id, listing_id, listing_action, visible) 
      VALUES (?, ?, ?, 'unreserve', true)
    `;
  
    try {
      // Check if the user already has an active reservation
      const [userReservation] = await db.promise().query(checkUserReservationSql, [user_id, listing_id]);
  
      if (userReservation.length > 0) {
        return { error: "User already has an active reservation for another listing." };
      }
  
      // Check if this specific listing is already reserved
      const [reservation] = await db.promise().query(checkReservationSql, [listing_id]);
  
      if (reservation.length > 0) {
        // Reservation exists, toggle off
        await db.promise().query(deleteReservationSql, [listing_id]);
        await db.promise().query(clearListingReserveSql, [listing_id]);
        await db.promise().query(createUnreserveNotificationSql, [owner_user_id, user_id, listing_id]);
        return { action: "unreserved" };
      } else {
        // No reservation exists, create it
        await db.promise().query(createReservationSql, [owner_user_id, user_id, listing_id]);
        await db.promise().query(updateListingReserveSql, [user_id, listing_id]);
        await db.promise().query(createNotificationSql, [owner_user_id, user_id, listing_id]);
        return { action: "reserved" };
      }
    } catch (err) {
      console.error("Error processing reservation toggle:", err);
      throw new Error("Error processing reservation toggle");
    }
  },
  
};
