import Head from 'next/head'
import {Roboto, Share_Tech_Mono} from '@next/font/google'
import {useEffect, useRef, useState} from "react";
import { useWindupString } from "windups";
import { ImSpinner8 } from 'react-icons/im';

import axios from "axios";

const roboto = Roboto({weight: "400", subsets: ["latin"]})
const mono = Share_Tech_Mono({weight: "400", subsets: ["latin"]});

export default function Home() {
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [gptResponse, setGptResponse] = useState("");
    const [text] = useWindupString(
        gptResponse,
        {
            pace: (char) => (char === " " ? 30 : 50)
        }
    );

    useEffect(() => {
        inputRef.current?.focus();
    }, []);


    useEffect(() => {
        const submit = async () => {
            setLoading(true);
            try {
                const response = await axios.post('/api/askChatGPT', {text: input});
                setGptResponse(response.data.response);
            } catch (error) {
                setGptResponse("Oops ... something went wrong");
            }
            setLoading(false);
        }

        const handleEnter = async (event: any) => {
            if (event.keyCode === 13) {
                event.preventDefault();
                await submit();
            }
            return true;
        };
        window.addEventListener('keydown', handleEnter);

        return () => {
            window.removeEventListener('keydown', handleEnter);
        };
    }, [input]);

    return (
        <>
            <Head>
                <title>ChatGPT Demo</title>
                <meta name="og:image" content="https://chatgpt.kyrill.dev/ogimage.png"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <ImSpinner8 className={"absolute top-2 spinner-border right-2 inline-block animate-spin w-8 h-8 rounded-full " + (loading ? "" : "hidden")}/>
            <main className={"flex flex-col justify-center items-center pt-44 " + roboto.className}>
                <div className="flex flex-col items-start w-fit gap-4">
                    <div className="flex flex-row gap-3 w-96">
                        <textarea placeholder={"ask something ..."} onChange={e => setInput(e.target.value)} ref={inputRef} className="text-3xl h-[10vh] outline-none"/>
                    </div>
                    <p className={"text-2xl text-gray-600 w-96 " + mono.className}>{text}</p>
                </div>

            </main>
        </>
    )
}
