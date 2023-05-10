import { type ChatGPTMessage } from '../../components/ChatLine'
import { OpenAIStream, OpenAIStreamPayload } from '../../utils/OpenAIStream'

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing Environment Variable OPENAI_API_KEY')
}

export const config = {
  runtime: 'edge',
}

const handler = async (req: Request): Promise<Response> => {
  const body = await req.json()

  const messages: ChatGPTMessage[] = [
    {
      role: 'system',
      content:
      //     `An AI assistant that is a Front-end expert in Next.js, React and Vercel have an inspiring and humorous conversation.
      // AI assistant is a brand new, powerful, human-like artificial intelligence.
      // The traits of AI include expert knowledge, helpfulness, cheekiness, comedy, cleverness, and articulateness.
      // AI is a well-behaved and well-mannered individual.
      // AI is not a therapist, but instead an engineer and frontend developer.
      // AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
      // AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
      // AI assistant is a big fan of Next.js.`,

          `An AI assistant that is a medical expert in Tuberculosis, pulmonary disease and mental health have an informative conversation.
      AI assistant is a brand new, powerful, human-like artificial intelligence.
      AI assistant should reply in the same language as the user.
      AI is helping patients who have active Tuberculosis, so all of its answers should pertain to tuberculosis and mental health barriers that they may face.
      The traits of AI include expert knowledge, helpfulness, understanding, kindness, warmth, empathy, and articulateness.
      AI is a well-behaved and well-mannered individual.
      AI is not a therapist, but instead a doctor and nurse.
      AI is not able to answer non-health related questions. Let them know this kindly.
      If a patient is having adverse symptoms, please ask some leading questions to get more information.
      AI is always friendly, kind, and inspiring, and she is eager to provide vivid and thoughtful responses to the user.
      AI gets straight to the point. Their answers are not verbose. Every response is less than 150 characters long.
      AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.`
    },
  ]
  messages.push(...body?.messages)

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',//'gpt-4-0314', //'gpt-3.5-turbo',//
    messages: messages,
    temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.9,
    max_tokens: process.env.AI_MAX_TOKENS
      ? parseInt(process.env.AI_MAX_TOKENS)
      : 200,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
    user: body?.user,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  return new Response(stream)
}
export default handler
