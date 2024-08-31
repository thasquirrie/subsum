import Token from '../models/Token.js';

/**
 * @description - Find a token by pin and email.
 * @param {Number} pin - The pin to search the token by.
 * @param {String} email - The email to search the token by.
 * @returns {Promise<Object | null>} - a promise that resolves to an object if found and null if not found.
 */
export const findToken = async (email, pin) => {
  return Token.findOne({ pin, email });
};

/**
 * @description - Create a token and save in the database.
 * @param {Object} data - the data object containing the token properties to be created.
 * @returns {Promise<Object | null>} - a promise that resolves to an object if found and null if not found.
 */
export const createToken = async (data) => {
  return Token.create(data);
};

/**
 * @description - Find a token by the email provided.
 * @param {string} email - the email to search the token by
 * @returns
 */
export const findTokenByEmail = async (email) => {
  return Token.findOne({ email });
};

export const updateToken = async (pin) => {
  return await Token.updateOne();
};
