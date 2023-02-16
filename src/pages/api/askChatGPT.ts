// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";

const MODEL = {
    best: "text-davinci-003",
    strong: "text-curie-001",
    medium: "text-babbage-001",
    weak: "text-ada-001"
}

type Data = {
    response: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // Check if Text is provided
    if (!req.body.text) {
        res.status(400).json({
            response: "Please input some text!"
        });
        return;
    }

    const response = await askChatGPT(req.body.text);

    res.status(200).json({
        response: response
    });
}

async function askChatGPT(prompt: string) {
    const {Configuration, OpenAIApi} = require("openai");
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: MODEL.strong,
        prompt: prompt,
        temperature: 0,
        max_tokens: 1500,
    });

    if (response.status === 200)
        return response.data.choices[0].text;
    else
        return "Error fetching ...";
}