import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export interface Generated {
  text: string;
  inputTokens: number;
  /** Answer tokens plus any thinking tokens (both billed at the output price). */
  outputTokens: number;
}

export type Generate = (system: string, prompt: string) => Promise<Generated>;

export const ANSWER_SCHEMA = {
  type: 'object',
  properties: {
    answer: { type: 'string', description: 'At most 120 words, plain text, third person.' },
    sectionIds: { type: 'array', items: { type: 'string' }, maxItems: 3, description: 'Ids of the sections the answer is based on, most relevant first.' },
    answerable: { type: 'boolean', description: 'False if the sections do not answer the question.' },
  },
  required: ['answer', 'sectionIds', 'answerable'],
};

/** One single-turn call: no history, JSON out, a hard output cap, minimal thinking, and an 8 second timeout. */
export function geminiGenerate(apiKey: string, model: string): Generate {
  const ai = new GoogleGenAI({ apiKey });
  return async (system, prompt) => {
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), 8000);
    try {
      const res = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: system,
          responseMimeType: 'application/json',
          responseJsonSchema: ANSWER_SCHEMA,
          maxOutputTokens: 300,
          temperature: 0.2,
          thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
          abortSignal: abort.signal,
        },
      });
      const u = res.usageMetadata ?? {};
      return {
        text: res.text ?? '',
        inputTokens: u.promptTokenCount ?? 0,
        outputTokens: (u.candidatesTokenCount ?? 0) + (u.thoughtsTokenCount ?? 0),
      };
    } finally {
      clearTimeout(timer);
    }
  };
}
