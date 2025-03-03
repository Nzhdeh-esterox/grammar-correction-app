import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

import { getGrammarCheckPrompt } from '../utils/prompts.js'; // Import prompt utility

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const grammarCorrector = async (text) => {
    try {
        const { prompt, config } = getGrammarCheckPrompt(text); // Destructure prompt and config

        const response = await openai.chat.completions.create({
            model: config.model,
            messages: [{ role: 'user', content: prompt }],
            temperature: config.temperature,
            max_tokens: config.max_tokens,
            top_p: config.top_p,
            frequency_penalty: config.frequency_penalty,
            presence_penalty: config.presence_penalty
        });
        console.log(' JSON.parse(result);', JSON.parse(response.choices[0].message.content))

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error checking grammar:', error);
        throw new Error('Failed to check grammar');
    }
};
