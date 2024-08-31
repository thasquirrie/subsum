import { Model } from 'mongoose';

/**
 * @description Create a new user in the database.
 * @param {Object} data - User data to be created.
 * @returns {Promise<Object>} A promise that resolves with the created user object.
 */
export async function createUser(Model, data) {
  return await Model.create(data);
}

/**
 * @description Find a user in the database by email.
 * @param {Model} Model - The Model to operate with.
 * @param {string} email - Email query to search for user.
 * @returns {Promise<Object>|null} A promise that resolves with the fetched user object if found, or null if not.
 */
export async function findUserByEmail(Model, email) {
  return Model.findOne({ email });
}

/**
 * @description Find a user in the database by phone.
 * * @param {Model} Model - The Model to operate with.
 * @param {string} phone - Phone query to search for user.
 * @returns {Promise<Object>|null} A promise that resolves with the fetched user object if found, or null if not.
 */
export async function findUserByPhone(Model, phone) {
  return Model.findOne({ phone });
}

/**
 * @description Find a user in the database by email or phone.
 * * @param {Model} Model - The Model to operate with.
 * @param {string} value - value query to search for user, phone or email.
 * @returns {Promise<Object>|null} A promise that resolves with the fetched user object if found, or null if not.
 */
export async function findUserByEmailOrPhone(Model, email, phone) {
  return Model.findOne({
    $and: [
      {
        $or: [
          { email: { $ne: null, $eq: email } },
          { phone: { $ne: null, $eq: phone } },
        ],
      },
    ],
  });
}

/**
 * @description Get all users in the database.
 * * @param {Model} Model - The Model to operate with.
 * @param {string} phone - Phone query to search for user.
 * @returns {Promise<Array>} A promise that resolves with an array of all users.
 */
export async function getAllUsers(Model) {
  return Model.find();
}

/**
 * @description Find a user by ID and delete from the database
 * * @param {Model} Model - The Model to operate with.
 * @param {string} id - ID of the user to be deleted.
 * @returns {} Returns nothing if the user is found.
 */
export async function deleteUser(Model, id) {
  return Model.findOneAndDelete(id);
}

/**
 * @description Get a user by ID from the database
 * * @param {Model} Model - The Model to operate with.
 * @param {string} id - ID of the user
 * @returns {Promise<Object|null>} A promise that resolves with the user if found, and null if not.
 */
export async function findUserById(Model, id) {
  return Model.findById(id);
}

/**
 * @description Get a user by ID from the database and update it.
 * * @param {Model} Model - The Model to operate with.
 * @param {string} id - ID of the user
 * @returns {Promise<Object|null>} A promise that resolves with the user if found and updated, and null if not.
 */
export async function findUserByIdAndUpdate(Model, id, data) {
  return Model.findByIdAndUpdate(id, data);
}

/**
 * @description Find a user and update it.
 * * @param {Model} Model - The Model to operate with.
 * @param {string} query - Query to find the
 * @param {Object} data - Data to update the user with.
 * @returns {Promise<Object|null>} A promise that resolves with the updated user if found, and null if not.
 */
export const findOneAndUpdate = (Model, query, data) => {
  return Model.findOneAndUpdate(query, data, {
    new: true,
    runValidator: true,
  });
};
