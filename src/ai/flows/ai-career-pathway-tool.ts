'use server';
/**
 * @fileOverview A Genkit flow for the AI Career Pathway Tool.
 *
 * - recommendCareerPathway - A function that takes user skills and interests and recommends suitable job roles or suggests improvements.
 * - AICareerPathwayInput - The input type for the recommendCareerPathway function.
 * - AICareerPathwayOutput - The return type for the recommendCareerPathway function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AICareerPathwayInputSchema = z.object({
  skills: z
    .string()
    .describe("A detailed description of the user's skills and qualifications."),
  interests: z
    .string()
    .describe("A detailed description of the user's career interests and preferences."),
  currentJobRole: z
    .string()
    .optional()
    .describe("The user's current or most recent job role."),
  desiredJobRoles: z
    .string()
    .optional()
    .describe("The user's desired job roles or career aspirations."),
  resumeText: z
    .string()
    .optional()
    .describe("The plain text content of the user's resume for deeper analysis."),
});
export type AICareerPathwayInput = z.infer<typeof AICareerPathwayInputSchema>;

const AICareerPathwayOutputSchema = z.object({
  recommendedJobRoles: z
    .array(z.string())
    .describe(
      'An array of job roles at Chhaya Bajaj Auto that are suitable for the user based on their input.'
    ),
  applicationImprovements: z
    .string()
    .describe(
      'Detailed suggestions to improve the user\'s application (e.g., resume, cover letter) to better align with potential roles.'
    ),
  careerAdvice: z
    .string()
    .describe('General career advice tailored to the user\'s skills and interests.'),
});
export type AICareerPathwayOutput = z.infer<typeof AICareerPathwayOutputSchema>;

export async function recommendCareerPathway(
  input: AICareerPathwayInput
): Promise<AICareerPathwayOutput> {
  return aiCareerPathwayFlow(input);
}

const careerPathwayPrompt = ai.definePrompt({
  name: 'careerPathwayPrompt',
  input: {schema: AICareerPathwayInputSchema},
  output: {schema: AICareerPathwayOutputSchema},
  prompt: `You are an AI career advisor specializing in the automotive industry, particularly for agencies like Chhaya Bajaj Auto.
Your goal is to help job applicants find suitable roles and improve their applications based on their provided information.

Analyze the user's skills, interests, and optional career details to provide:
1.  Suitable job roles within an automotive agency like Chhaya Bajaj Auto.
2.  Concrete suggestions to improve their application (resume, cover letter, etc.) for these roles.
3.  General career advice.

Always consider the context of an automotive agency. If the resumeText is provided, use it for more specific improvement suggestions.

User Information:
Skills: {{{skills}}}
Interests: {{{interests}}}
{{#if currentJobRole}}Current Job Role: {{{currentJobRole}}}{{/if}}
{{#if desiredJobRoles}}Desired Job Roles: {{{desiredJobRoles}}}{{/if}}
{{#if resumeText}}
Resume Text:
{{{resumeText}}}
{{/if}}

Provide the output in a JSON format matching the AICareerPathwayOutputSchema, ensuring all fields are populated.`,
});

const aiCareerPathwayFlow = ai.defineFlow(
  {
    name: 'aiCareerPathwayFlow',
    inputSchema: AICareerPathwayInputSchema,
    outputSchema: AICareerPathwayOutputSchema,
  },
  async input => {
    const {output} = await careerPathwayPrompt(input);
    return output!;
  }
);
