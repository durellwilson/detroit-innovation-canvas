import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export const runtime = 'edge';

const enhancedIdeaSchema = z.object({
  title: z.string(),
  description: z.string(),
  impact: z.string(),
  nextSteps: z.array(z.string()),
  resources: z.array(z.string()),
  collaborators: z.array(z.string()),
});

export async function POST(req: Request) {
  const { idea } = await req.json();

  const { object } = await generateObject({
    model: openai('gpt-4-turbo'),
    schema: enhancedIdeaSchema,
    prompt: `Enhance this Detroit innovation idea: "${idea}"

Make it:
- Actionable and specific
- Community-focused
- Impactful for Detroit
- Collaborative
- Inspiring

Include concrete next steps and resources.`,
  });

  return Response.json(object);
}
