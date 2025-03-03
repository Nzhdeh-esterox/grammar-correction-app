import User from '../models/User.js';

// Function to find user by username
export const findUserByUsername = async (username) => {
    return User.findOne({ username });
};

// Function to create a new user
export const createUser = async (username, password) => {
    const newUser = new User({ username, password });

    return await newUser.save();
};

