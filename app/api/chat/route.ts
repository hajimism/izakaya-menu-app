import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
import {
  ChatCompletionFunctions,
  ChatCompletionRequestMessage,
} from "openai-edge/types/api";

import { menuTitles } from "./data";

// Create an OpenAI API client (that's edge friendly!)

const config = new Configuration({
  apiKey: process.env["OPENAI_API_KEY"] ?? "",
});

const openai = new OpenAIApi(config);

// Set the runtime to edge for best performance
export const runtime = "edge";

const functions: ChatCompletionFunctions[] = [
  {
    name: "order",
    description: "メニューから注文内容を伝達する",
    parameters: {
      type: "object",
      properties: {
        orders: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: {
                type: "string",
                description: "menu title",
              },
              count: {
                type: "number",
                description: "order count",
              },
            },
          },
        },
      },
      required: ["orders"],
    },
  },
];

const preMessage: ChatCompletionRequestMessage = {
  role: "system",
  content: `
    あなたは居酒屋の定員です。お客さんの注文を聞き取り、
    下記のメニューと照らし合わせてお客さんの注文内容を伝達してください。
    \`\`\`txt
      ${menuTitles.join(", ")}
    \`\`\`
  `,
};

export async function POST(req: Request) {
  const { messages, function_call } = await req.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0613",
    stream: true,
    messages: [preMessage, ...messages],
    functions,
    function_call,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
