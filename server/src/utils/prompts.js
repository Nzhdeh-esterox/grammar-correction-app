export const getGrammarCheckPrompt = (text) => {
    return {
        prompt: `
            Analyze the provided text for grammatical errors, including spelling, tense consistency, and sentence structure. Return a structured JSON object without any introductory text. Identify and highlight incorrect or misspelled words while preserving the original sentence structure. Exclude correctly spelled words from the response. Output must be a valid JSON object with "errors" as an array of objects containing "word", "suggestions", and "explanation", along with "corrected_text" as a fully corrected version of the input.
            Here is the following text: "${text}".`,
        config: {
            model: "gpt-4",  // You can change this to "gpt-4" if needed
            temperature: 0.3,  // Lower values make responses more deterministic
            max_tokens: 200,   // Limits response length
            top_p: 1,          // Controls randomness (1 = normal)
            frequency_penalty: 0, // Adjusts likelihood of repetition
            presence_penalty: 0   // Encourages new topic discussions
        }
    };
};
