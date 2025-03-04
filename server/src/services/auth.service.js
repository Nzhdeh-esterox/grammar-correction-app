import User from '../models/User.js';

/**
 * Find a user by their username.
 *
 * @param {string} username - The username to search for.
 * @return {Promise<User>} A promise that resolves to the user found by the username.
 */
export const findUserByUsername = async (username) => {
    return User.findOne({ username });
};

/**
 * Creates a new user with the given username and password.
 *
 * @param {string} username - The username of the new user
 * @param {string} password - The password of the new user
 * @return {Promise} A promise that resolves to the saved user object
 */
export const createUser = async (username, password) => {
    const newUser = new User({ username, password });

    return await newUser.save();
};

