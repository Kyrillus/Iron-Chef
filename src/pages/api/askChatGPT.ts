// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

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

    // Check if input is not against openai's policies
    const prohibited = await flagged(req.body.text);

    if (prohibited) {
        res.status(200).json({
            response: "Your input seems to violate OpenAI's policies."
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
        model: MODEL.best,
        prompt: prompt,
        temperature: 0,
        max_tokens: 100,
    });

    if (response.status === 200)
        return response.data.choices[0].text;
    else
        return "Error fetching ...";
}

async function flagged(input: string) {
    const response = await fetch("https://chatgpt.kyrill.dev/api/moderation", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            text: input
        })
    });

    const moderation = await response.json();

    console.log(moderation);

    return moderation.flagged;
}
