// userModel.js
const db = require("../database/db");


module.exports = {
  queryUserInfo: async(user_id) => {
    const sql =
      "SELECT user_id, username, first_name, last_name, email, phone_number FROM Users WHERE user_id = ?";
    const result = await db
      .promise()
      .query(sql, [user_id])
      .then(([result]) => result)
      .catch(console.log);
    console.log(result);
    return result;
  },
  queryUserListings: (user_id) => {
    const sql =
      "SELECT listing_id, title, price, image1, image2, zip_code FROM Listings WHERE user_id = ?";
    const result = db
      .promise()
      .query(sql, [user_id])
      .then(([result]) => result)
      .catch(console.log);
    return result;
  },

  queryUserFavorites: (user_id) => {
    const sql = `
      SELECT l.listing_id, l.title, l.price, l.user_id, l.image1, l.image2, l.reserved_by, l.zip_code
      FROM Listings l
      JOIN Favorites f ON l.listing_id = f.listing_id
      WHERE f.user_id = ?
      AND (l.reserved_by IS NULL OR l.reserved_by = ?)
    `;
    const result = db
      .promise()
      .query(sql, [user_id, , user_id])
      .then(([result]) => result)
      .catch(console.log);
    return result;
  },
  updateUserFavorite: (user_id, listing_id, isFavorite) => {
    const checkFavoriteSql =
      "SELECT * FROM Favorites WHERE user_id = ? AND listing_id = ?";
    const addFavoriteSql =
      "INSERT INTO Favorites (user_id, listing_id) VALUES (?, ?)";
    const removeFavoriteSql =
      "DELETE FROM Favorites WHERE user_id = ? AND listing_id = ?";
    const addNotificationSql = `INSERT INTO UserNotifications (owner_user_id, user_id, listing_id, listing_action, visible) 
       VALUES (?, ?, ?, 'favorite', true)`;
    const unfavNotificationSql = `INSERT INTO UserNotifications (owner_user_id, user_id, listing_id, listing_action, visible) 
        VALUES (?, ?, ?, 'unfavorite', true)`;

    const result = db
      .promise()
      .query(checkFavoriteSql, [user_id, listing_id])
      .then(([rows]) => {
        if (rows.length > 0) {
          return db
            .promise()
            .query(removeFavoriteSql, [user_id, listing_id])
            .then(() =>
              db
                .promise()
                .query(unfavNotificationSql, [
                  owner_user_id,
                  user_id,
                  listing_id,
                ])
            )
            .then(() => ({ isFavorite: false }));
        } else {
          return db
            .promise()
            .query(addFavoriteSql, [user_id, listing_id])
            .then(() =>
              db
                .promise()
                .query(addNotificationSql, [owner_user_id, user_id, listing_id])
            )
            .then(() => ({ isFavorite: true }));
        }
      })
      .catch(console.log);

    return result;
  },
  updateUserInfo: (user_id, username, first_name, last_name, phone_number) => {
    const sql = `
      UPDATE Users 
      SET username = ?, first_name = ?, last_name = ?, phone_number = ? 
      WHERE user_id = ?;
    `;
    return db
      .promise()
      .query(sql, [username, first_name, last_name, phone_number, user_id])
      .then(([result]) => result)
      .catch(console.error);
  },
  getUserNotifications: (user_id) => {
    const sql = `
      SELECT UserNotifications.notification_id, UserNotifications.listing_id, UserNotifications.user_id, Users.username, 
             UserNotifications.listing_action, UserNotifications.created_at, Listings.title, Listings.listing_id
      FROM UserNotifications
      JOIN Listings ON UserNotifications.listing_id = Listings.listing_id
      JOIN Users ON UserNotifications.user_id = Users.user_id
      WHERE UserNotifications.owner_user_id = ? 
      AND UserNotifications.visible = true;
    `;
    return db
      .promise()
      .query(sql, [user_id])
      .then(([result]) => result)
      .catch(console.error);
  },
  removeNotification: (notification_id) => {
    const sql = `
      UPDATE UserNotifications 
      SET visible = false 
      WHERE notification_id = ?;
    `;
    return db
      .promise()
      .query(sql, [notification_id])
      .then(([result]) => result)
      .catch(console.error);
  },
};
