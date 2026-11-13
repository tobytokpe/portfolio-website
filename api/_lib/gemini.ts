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

/** Default model order: 3.5 Flash-Lite answered in about 1 to 2s in testing; 3.1 Flash-Lite (cheaper, but its latency swung from 1s to 20s) is the fallback. */
export const DEFAULT_MODELS = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];
const TIMEOUT_MS = 8000;

/**
 * One single-turn call: no history, JSON out, a hard output cap, minimal thinking. Each model gets 8 seconds; if
 * one times out or errors, the next is tried once.
 */
export function geminiGenerate(apiKey: string, models: string[] = DEFAULT_MODELS): Generate {
  const ai = new GoogleGenAI({ apiKey });
  const once = async (model: string, system: string, prompt: string): Promise<Generated> => {
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), TIMEOUT_MS);
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
  return async (system, prompt) => {
    let lastError: unknown;
    for (const model of models) {
      try {
        return await once(model, system, prompt);
      } catch (err) {
        lastError = err;
        console.log(`[ask] ${model} failed: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    throw lastError;
  };
}
