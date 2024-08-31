import Card from '../models/Card.js';

/**
 * @description Create a new card in the database.
 * @param {Object} data - Card data to be created.
 * @returns {Promise<Object>} A promise that resolves with the created card object.
 */
export async function createCard(data) {
  return await Card.create(data);
}

/**
 * @description Find a card in the database by id.
 * @param {string} id - ID query to search for card.
 * @returns {Promise<Object>|null} A promise that resolves with the fetched card object if found, or null if not.
 */
export async function findCardById(id) {
  return Card.findOneById(id);
}

/**
 * @description Find all cards of a user.
 * * @param {string} id - ID query of the user to search for cards.
 * @returns {Promise<Array>} A promise that resolves with the fetched cards array
 */
export async function findCards(id) {
  return Card.find({ user: id });
}

/**
 * @description Update a card in the database.
 * @param {string} id - ID query to search for card.
 * @param {Object} data - Card data to be updated.
 * @returns {Promise<Object>|null} A promise that resolves with the updated card object if found, or null if not.
 */
export async function updateCard(id) {
  return Card.findOneByIdAndUpdate(id, data);
}

/**
 * @description Find a  in the database by email.
 * @param {string} id - ID query to search for user.
 * @param {Object} data - User data to be updated.
//  * @returns {Promise<Object>|null} A promise that resolves with the fetched user object if found, or null if not.
 */
export async function deleteCard(id) {
  return Card.findOneAndDelete(id);
}
