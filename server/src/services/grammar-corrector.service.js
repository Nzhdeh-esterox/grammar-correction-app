import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

import { getGrammarCheckPrompt } from '../utils/prompts.js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Corrects the grammar of the input text using OpenAI's language model.
 *
 * @param {string} text - The text to be checked and corrected for grammar.
 * @return {Promise<string>} The corrected text after grammar check.
 */
export const grammarCorrector = async (text) => {
    try {
        const { prompt, config, responseFormat } = getGrammarCheckPrompt(text);

        const response = await openai.chat.completions.create({
            model: config.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: config.temperature,
            max_tokens: config.max_tokens,
            frequency_penalty: config.frequency_penalty,
            presence_penalty: config.presence_penalty,
            response_format: responseFormat
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error checking grammar:', error);
        throw new Error('Failed to check grammar');
    }
};
