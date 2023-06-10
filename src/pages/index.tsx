import Head from 'next/head'
import React, {useEffect, useRef, useState} from "react";


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

    return (
        <>
            <Head>
                <title>Iron-Chef AI</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {/*
              <textarea placeholder={"ask something ..."} onChange={e => setInput(e.target.value)} ref={inputRef} className="text-3xl h-[10vh] outline-none"/>
              */}
            <main className="font-main overflow-x-hidden">
                <Navbar/>
                {ingredients && <Module ingredients={ingredients}/>}
            </main>
        </>
    )
}
