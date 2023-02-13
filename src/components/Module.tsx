import React from 'react';

function Module() {
    return (
        <div className="flex justify-center items-center">
            <h1>

            </h1>
        </div>
    );
}

export ser

const loadData = async () => {
    const response = await fetch('/ingredients2.csv');
    const reader = response.body.getReader()
    const result = await reader.read() // raw array
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value) // the csv text
    const ingredients = csv.split('\r\n').map(ingr => ingr.replaceAll('"', ''))
    console.log();
}
loadData();

export default Module;