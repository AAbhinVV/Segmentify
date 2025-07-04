import { db } from '@/db'
import { openai } from '@/lib/openai'
import { getPineconeClient } from '@/lib/pinecone'
import { sendMessageValidator } from '@/lib/validators/send-message-validator'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { OpenAIEmbeddings } from '@langchain/openai'
import { PineconeStore } from '@langchain/pinecone'
import { NextRequest, NextResponse } from 'next/server'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const POST = async (req: NextRequest) => {
  const body = await req.json()

  const { getUser } = getKindeServerSession()
  const user = await getUser()

  if (!user?.id) return new NextResponse("Unauthorized.", { status: 401 });

  const { id: userId } = user

  if (!userId)
    return new Response('Unauthorized', { status: 401 })

  const { fileId, message } = sendMessageValidator.parse(body)

  const file = await db.file.findFirst({
    where: {
      id: fileId,
      userId,
    },
  })

  if (!file)
    return new Response('Not found', { status: 404 })

  await db.message.create({
    data: {
      text: message,
      isUserMessage: true,
      userId,
      fileId,
    },
  })

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
  })

  const pinecone = await getPineconeClient()
  const pineconeIndex = pinecone.Index('project')

  const vectorStore = await PineconeStore.fromExistingIndex(
    embeddings,
    {
      pineconeIndex,
      namespace: file.id,
    }
  )

  const results = await vectorStore.similaritySearch(message, 4)

  const prevMessages = await db.message.findMany({
    where: {
      fileId,
    },
    orderBy: {
      createdAt: 'asc',
    },
    take: 6,
  })

  const formattedPrevMessages = prevMessages.map((msg) => ({
    role: msg.isUserMessage ? ('user' as const) : ('assistant' as const),
    content: msg.text,
  }))

  const completionStream = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    temperature: 0,
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format.',
      },
      {
        role: 'user',
        content: `Use the following pieces of context (or previous conversaton if needed) to answer the users question in markdown format. \nIf you don't know the answer, just say that you don't know, don't try to make up an answer.
        
\n----------------\n

PREVIOUS CONVERSATION:
${formattedPrevMessages.map((message) => {
  if (message.role === 'user') return `User: ${message.content}\n`
  return `Assistant: ${message.content}\n`
}).join('')}

\n----------------\n

CONTEXT:
${results.map((r) => r.pageContent).join('\n\n')}

USER INPUT: ${message}`,
      },
    ],
  })

  let fullCompletion = ''

  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of completionStream) {
        const content = chunk.choices?.[0]?.delta?.content
        if (content) {
          fullCompletion += content
          controller.enqueue(new TextEncoder().encode(content))
        }
      }

      // Store the assistant's reply in DB
      await db.message.create({
        data: {
          text: fullCompletion,
          isUserMessage: false,
          fileId,
          userId,
        },
      })

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  })
}