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
            temperature: 0.3,
            max_tokens: 800,
            frequency_penalty: 0,
            presence_penalty: 0
        },
        responseFormat: {
            "type": "json_schema",
            "json_schema": {
                "name": "incorrect_words",
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
