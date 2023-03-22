import { NextResponse } from 'next/server'

import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
	const body = await req.json()

	if (body.text && body.text.trim().length !== 0) {
		const completion = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt: ` hex code of a color describing the text or word "${body.text}" :\n\n`,
			temperature: 0,
			max_tokens: 64,
			top_p: 1.0,
			frequency_penalty: 0.0,
			presence_penalty: 0.0,
			stop: [';'],
		})
		console.log(completion.data)
		return NextResponse.json({ result: completion.data })
	}
}
