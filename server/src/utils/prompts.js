export const getGrammarCheckPrompt = (text) => {
    return {
        prompt: `
            Analyze the provided text for grammatical errors, including spelling, tense consistency,
            and sentence structure.
            Identify and highlight incorrect or misspelled words while preserving the original sentence structure.
            Exclude correctly spelled words from the response.
            Here is the following text: "${text}".
            Return a JSON format without any introductory text.`,
        config: {
            model: "gpt-4o-mini-2024-07-18",
            temperature: 0.3,  // Lower values make responses more deterministic
            max_tokens: 800,   // Limits response length
            frequency_penalty: 0, // Adjusts likelihood of repetition
            presence_penalty: 0   // Encourages new topic discussions
        },
        responseFormat: {
            "type": "json_schema",
            "json_schema": {
                "name": "incorrect_words",  // ✅ Ensure name is inside "json_schema"
                "schema": {
                    "type": "object",
                    "properties": {
                        "errors": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "word": { "type": "string" },
                                    "explanation": { "type": "string" }
                                },
                                "required": ["word", "explanation"]
                            }
                        }
                    },
                    "additionalProperties": false,
                    "required": ["errors"]
                }
            }
        }
    };
};
