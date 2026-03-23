import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Initializes Genkit with the Google AI plugin.
 * It attempts to use either GOOGLE_GENAI_API_KEY or GEMINI_API_KEY from environment variables.
 */
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY
    })
  ],
  model: 'googleai/gemini-1.5-flash',
});
