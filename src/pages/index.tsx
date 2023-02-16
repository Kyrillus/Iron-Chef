import Head from 'next/head'
import React, {useEffect, useRef, useState} from "react";
import { useWindupString } from "windups";
import { ImSpinner8 } from 'react-icons/im';

import axios from "axios";
import Navbar from "@/components/Navbar";
import Module from "@/components/Module";


export default function Home() {
    const [ingredients, setIngredients] = useState<string[]>();
    useEffect(() => {
        const loadData = async () => {
            const response = await fetch('/ingredients.csv');
            const reader = response.body?.getReader();
            const result = await reader?.read() // raw array
            const decoder = new TextDecoder('utf-8')
            const csv = decoder.decode(result?.value) // the csv text
            setIngredients(csv.split('\n').map(ingr => ingr.replaceAll('"', '')));
        }
        loadData();
    }, []);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [gptResponse, setGptResponse] = useState("");

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

    return (
        <>
            <Head>
                <title>ChatGPT Demo</title>
                <meta name="og:image" content="https://chatgpt.kyrill.dev/ogimage.png"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {/*
              <textarea placeholder={"ask something ..."} onChange={e => setInput(e.target.value)} ref={inputRef} className="text-3xl h-[10vh] outline-none"/>
              */}
            <main className="font-main ">
                <Navbar/>
                {ingredients && <Module ingredients={ingredients}/>}
            </main>
        </>
    )
}
