import { grammarCorrector } from '../services/grammar-corrector.service.js';

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
