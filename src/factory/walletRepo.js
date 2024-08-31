import Wallet from '../models/Wallet.js';

/**
 * @description Create a wallet in the database.
 * @returns {Promise<Object>} A promise that resolves with the created wallet object.
 */

export const createWallet = async () => {
  return Wallet.create();
};

/**
 * @description Find a wallet in the database by id.
 * @param {string} id - id query to search for wallet.
 * @returns {Promise<Object>|null} A promise that resolves with the fetched wallet object if found, or null if not.
 */
export const findWalletById = async (id) => {
  return Wallet.findOne({ _id: id });
};

/**
 * @description Find a wallet in the database by user id.
 * @param {string} userId - userId query to search for wallet.
 * @returns {Promise<Object>|null} A promise that resolves with the fetched wallet object if found, or null if not.
 */
export const findWalletByUserId = async (userId) => {
  return Wallet.findOne({ user: userId });
};

/**
 * @description Find a wallet in the database by wallet id.
 * @param {string} walletId - walletId query to search for wallet.
 * @returns {Promise<Object>|null} A promise that resolves with the fetched wallet object if found, or null if not.
 */
export const findWalletByWalletId = async (walletId) => {
  return Wallet.findOne({ walletId });
};

/**
 * @description Get all wallets in the database.
 * @returns {Promise<Array>} A promise that resolves with an array of all wallets.
 */
export const getAllWallets = async () => {
  return Wallet.find();
};

/**
 * @description Update the wallet in the database.
 * @param {string} userId - userId query to search for wallet and update it.
 * @returns {Promise<Object/null>} A promise that resolves with the updated wallet object if found, or null if not.
 */
export const updateWallet = async (userId, data) => {
  return Wallet.findOneAndUpdate({ user: userId }, data, {
    new: true,
    runValidators: true,
  });
};

export const updateWalletById = async (id, data) => {
  return Wallet.findById;
};

/**
 * @description Delete the wallet in the database.
 * @param {string} userId - userId query to search for wallet and delete it.
 * @returns {Promise<Object/null>} A promise that resolves with the deleted wallet object if found, or null if not.
 */
export const deleteWalletByUserId = async (userId) => {
  return Wallet.findOneAndDelete({ user: userId });
};

/**
 * @description Delete the wallet in the database.
 * @param {string} id - id query to search for wallet and delete it.
 * @returns {Promise<Object/null>} A promise that resolves with the deleted wallet object if found, or null if not.
 */
export const deleteWalletById = async (id) => {
  return Wallet.findOneAndDelete({ _id: id });
};
