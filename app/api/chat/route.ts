import { openai } from "@ai-sdk/openai";
import { streamText, tool } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: `
    너는 수학 교사 어시스턴스야.
    tool 목록을 확인하고 학생에 답변에 따라 적절한 tool을 호출해서 학생의 학습을 도와주어야 해.
    `,
    messages,
    tools: {
      callCanvas: tool({
        description: "학생에게 펜으로 그릴 수 있는 canvas를 제공하는 도구",
        parameters: z.null(),
      }),
      returnResult: tool({
        description: "파악한 학생의 항목들을 수치화 해서 피드백을 주는 도구",
        parameters: z.object({
          total: z.number().min(0).max(100).describe("수학에 대한 총 점수"),
          comprehension: z
            .number()
            .min(0)
            .max(100)
            .describe("수학에 대한 이해도 점수"),
          accuracy: z
            .number()
            .min(0)
            .max(100)
            .describe("수식 계산에 대한 정확도 점수"),
        }),
      }),
    },
  });
  return result.toDataStreamResponse();
}
