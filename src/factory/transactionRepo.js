import Transaction from '../models/Transaction.js';

/**
 * @description Create a transaction in the database.
 * @param {Object} data - value query to create transaction.
 * @returns {Promise<Object>} A promise that resolves with the created transaction object.
 */
export const createTransaction = async (data) => {
  return await Transaction.create(data);
};

/**
 * @description Find a transaction in the database by transactionNumber.
 * @param {string} transactionNumber - transactionNumber query to search for transaction.
 * @returns {Promise<Object>|null} A promise that resolves with the fetched transaction object if found, or null if not.
 */
export const findTransactionByTransactionNumber = async (transactionNumber) => {
  return Transaction.findOne({ transactionNumber });
};

/**
 * @description Get all transactions in the database.
 * @returns {Promise<Array>} A promise that resolves with an array of all transactions.
 */
export const getAllTransactions = async () => {
  return Transaction.find();
};

/**
 * @description Get all transactions in the database by user id.
 * @param {string} userId - userId query to search for transaction.
 * @returns {Promise<Array>} A promise that resolves with an array of all transactions.
 */
export const getTransactionsByUserId = async (userId) => {
  return Transaction.find({ user: userId });
};

/**
 * @description Update the transaction in the database.
 * @param {string} transactionNumber - transactionNumber query to search for transaction and update it.
 * @returns {Promise<Object/null>} A promise that resolves with the updated transaction object if found, or null if not.
 */
export const updateTransaction = async (transactionNumber, data) => {
  return Transaction.findOneAndUpdate({ transactionNumber }, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * @description Delete the transaction in the database.
 * @param {string} transactionNumber - transactionNumber query to search for transaction and delete it.
 * @returns {Promise<Object/null>} A promise that resolves with the deleted transaction object if found, or null if not.
 */
export const deleteTransaction = async (transactionNumber) => {
  return Transaction.findOneAndDelete({ transactionNumber });
};

// export const convertAirtimeToCash = async () => {
//   const
// }
