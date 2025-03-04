import { grammarCorrector } from '../services/grammar-corrector.service.js';

/**
 * Check and correct the grammar of the input text.
 *
 * @param {object} req - The request object containing the text to be checked.
 * @param {object} res - The response object to send the corrected text.
 * @return {Promise<void>} A Promise that resolves when the grammar checking is completed.
 */
export const checkAndCorrectGrammar = async (req, res) => {
    const { text } = req.body;

    try {
        const correctedTextData = await grammarCorrector(text);

        res.status(201).json(JSON.parse(correctedTextData));
    } catch (error) {
        console.error('Error checking grammar:', error);
        res.status(500).json({ message: 'Error checking grammar' });
    }
};
