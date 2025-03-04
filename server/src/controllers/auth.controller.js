import * as authService from '../services/auth.service.js';
import jwt from 'jsonwebtoken';

/**
 * Creates a new user with the provided username and password.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response indicating success or failure.
 */
export const register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = await authService.createUser(username, password);

        res.status(201).json({ message: 'User registered', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

/**
 * Logs in a user with the provided username and password.
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} JSON response indicating success or failure with a token.
 */
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await authService.findUserByUsername(username);

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User logged successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
