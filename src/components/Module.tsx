import React, {useEffect, useState} from 'react';
import Autocomplete from "@/components/Autocomplete";
import SliderTimer from "@/components/Slider";
import {Button, Checkbox, Stack, Switch} from "@chakra-ui/react";

function Module(props: { ingredients: string[] }) {
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>();
    const [stove, setStove] = useState(false);
    const [microwave, setMicrowave] = useState(false);
    const [blender, setBlender] = useState(false);
    const [oven, setOven] = useState(false);
    const [sliderValue, setSliderValue] = useState(60);
    const [vegetarian, setVegetarian] = useState(false);
    const [keto, setKeto] = useState(false);
    const [lowfat, setLowFat] = useState(false);

    const prompt = () => {
        console.log(selectedIngredients, "stove " + stove, "microwave " + microwave, "blender " + blender, "oven " + oven, "time " + sliderValue, "vegetarian " + vegetarian, "keto " + keto, "lowfat " + lowfat)
    }

    return (
        <div className="flex justify-center gap-16 flex-col items-center py-12 select-none">
            <div className="flex flex-col gap-4 px-8 w-full md:w-3/5 max-w-2xl">
                <h1 className="font-semibold text-lg">Which ingredients do you have at home?</h1>
                <Autocomplete setItems={setSelectedIngredients} items={[...new Set(props.ingredients)]} placeholder="ingredients..."/>
            </div>
            <div className="flex flex-col gap-6 px-8 w-full md:w-3/5 max-w-2xl">
                <h1 className="font-semibold text-lg">Which tools do you have at home?</h1>
                <div className="flex flex-row gap-6 md:gap-20 justify-center">
                    <div className="flex flex-row gap-4 items-center">
                        <Switch colorScheme="purple" onChange={value => setStove(value.target.checked)} size='md'/>
                        <h1 className="w-24">Stove Top</h1>
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                        <Switch colorScheme="purple" onChange={value => setMicrowave(value.target.checked)} size='md'/>
                        <h1 className="w-24">Microwave</h1>
                    </div>
                </div>
                <div className="flex flex-row gap-6 md:gap-20 justify-center">
                    <div className="flex flex-row gap-4 items-center">
                        <Switch colorScheme="purple" onChange={value => setBlender(value.target.checked)} size='md'/>
                        <h1 className="w-24">Blender</h1>
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                        <Switch colorScheme="purple" onChange={value => setOven(value.target.checked)} size='md'/>
                        <h1 className="w-24">Oven</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 px-8 w-full md:w-3/5 max-w-2xl">
                <h1 className="font-semibold text-lg">How much time do you have?</h1>
                <SliderTimer timer={sliderValue} setTimer={setSliderValue}/>
            </div>
            <div className="flex flex-col gap-12 px-8 justify-center w-full md:w-3/5 max-w-2xl">
                <h1 className="font-semibold text-lg">Any other preferences?</h1>
                <div className="flex flex-row w-full gap-6 md:gap-12 justify-center">
                    <Checkbox onChange={value => setVegetarian(value.target.checked)} colorScheme='purple' value='Vegetarian'>Vegetarian</Checkbox>
                    <Checkbox onChange={value => setKeto(value.target.checked)} colorScheme='purple' value='KETO'>KETO</Checkbox>
                    <Checkbox onChange={value => setLowFat(value.target.checked)} colorScheme='purple' value='Low Fat'>Low Fat</Checkbox>
                </div>
            </div>
            <div className="flex flex-col px-8 gap-12 justify-center w-full md:w-3/5 max-w-2xl">
                <Button onClick={prompt} colorScheme='purple' size='lg'>
                    Generate Meal 🥣
                </Button>
            </div>
        </div>
    );
}

export default Module;