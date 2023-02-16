import React, {useState} from 'react';
import Autocomplete from "@/components/Autocomplete";
import SliderTimer from "@/components/Slider";
import {Button, Checkbox, Switch, useDisclosure} from "@chakra-ui/react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import load = Simulate.load;
import {ImSpinner8} from "react-icons/im";

function Module(props: { ingredients: string[] }) {

    const [loading, setLoading] = useState(false);
    const [gptResponse, setGptResponse] = useState("");

    const [selectedIngredients, setSelectedIngredients] = useState<string[]>();
    const [stove, setStove] = useState(false);
    const [microwave, setMicrowave] = useState(false);
    const [blender, setBlender] = useState(false);
    const [oven, setOven] = useState(false);
    const [sliderValue, setSliderValue] = useState(60);
    const [vegetarian, setVegetarian] = useState(false);
    const [keto, setKeto] = useState(false);
    const [lowfat, setLowFat] = useState(false);

    const {isOpen, onOpen, onClose} = useDisclosure()
    const finalRef = React.useRef(null)

    const prompt = async () => {
        setLoading(true);
        try {
            const response = await axios.post('/api/askChatGPT',
                {
                    text: "I want to cook a meal. Please give me a detailed recipe! I have following ingredients at home: " + selectedIngredients?.join(", ") + " ." +
                        (oven || stove || microwave || blender ? ("I only have following tools at home: " + (oven ? 'oven' : '') + ", " + (microwave ? 'microwave' : '') + ", " + (blender ? 'blender' : '') + ", " + (stove ? 'stove' : '') + ".") : 'I dont have any tools at home like oven, stove, ect.') +
                        "I have " + sliderValue + " minutes time to cook this meal. " +
                        (vegetarian || keto || lowfat ? ("Following preferences have to be considered: " + (vegetarian ? 'vegetarian, ' : '') + (keto ? 'keto, ' : '') + (lowfat ? 'low fat, ' : '')) : '')
                });
            setGptResponse(response.data.response);
        } catch (error) {
            setGptResponse("Oops ... something went wrong");
        }
        setLoading(false);

        onOpen();
    }

    return (
        <div className="flex justify-center gap-16 flex-col items-center py-12 select-none">
            <div className="flex flex-col gap-4 px-8 w-full md:w-3/5 max-w-2xl">
                <h1 className="font-semibold text-lg">Which ingredients do you have at home?</h1>
                <Autocomplete setItems={setSelectedIngredients} items={[...new Set(props.ingredients)]}
                              placeholder="ingredients..."/>
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
                    <Checkbox onChange={value => setVegetarian(value.target.checked)} colorScheme='purple'
                              value='Vegetarian'>Vegetarian</Checkbox>
                    <Checkbox onChange={value => setKeto(value.target.checked)} colorScheme='purple'
                              value='KETO'>KETO</Checkbox>
                    <Checkbox onChange={value => setLowFat(value.target.checked)} colorScheme='purple' value='Low Fat'>Low
                        Fat</Checkbox>
                </div>
            </div>
            <div className="flex flex-col px-8 gap-12 justify-center w-full md:w-3/5 max-w-2xl">
                <Button onClick={prompt} colorScheme='purple' size='lg'>
                    {loading ? (<ImSpinner8 className="animate-spin"/>) : ('Generate Meal 🥣')}
                </Button>
            </div>

            <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Your recipe is ready!</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <p>{gptResponse}</p>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} colorScheme='blue' variant='ghost'>Share Recipe!</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Module;