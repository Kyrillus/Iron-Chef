// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import axios from "axios";

type Data = {
    flagged: boolean
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (!req.body.text){
        res.status(400).json({
            flagged: false
        });
        return;
    }

    let violation = false;

    const data = await axios("https://api.openai.com/v1/moderations",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + process.env.NEXT_PUBLIC_OPENAI_API_KEY
        },
        data: {
            input: req.body.text
        }
    });

    if (data.status === 200){
        violation = data.data.results[0].flagged;
    }

    res.status(200).json({
        flagged: violation
    })
}
