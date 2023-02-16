import {Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, useColorMode} from "@chakra-ui/react";
import {FaClock} from "react-icons/fa";

function SliderTimer({timer ,setTimer}: any) {
    const {colorMode, toggleColorMode} = useColorMode();

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'md',
    }

    return (
        <Box className="px-10 md:px-6" pt={6} pb={2}>
            <Slider defaultValue={60} min={10} max={240} className={colorMode === 'dark' ? 'text-purple-100' : 'text-purple-900'} aria-label='slider-ex-6' onChange={(val) => {
                setTimer(val)
            }}>
                <SliderMark value={60} {...labelStyles}>
                    1h
                </SliderMark>
                <SliderMark value={120} {...labelStyles}>
                    2h
                </SliderMark>
                <SliderMark value={180} {...labelStyles}>
                    3h
                </SliderMark>
                <SliderMark
                    className="rounded-lg"
                    value={timer}
                    textAlign='center'
                    bg='purple.500'
                    color='white'
                    mt='-10'
                    ml='-5'
                    w='20'
                >
                    <span>{timer} min</span>
                </SliderMark>
                <SliderTrack>
                    <SliderFilledTrack bg={'purple.500'}/>
                </SliderTrack>
                <SliderThumb bg={colorMode === 'dark' ? 'purple.500' : 'white'} boxSize={6}>
                    <Box as={FaClock} />
                </SliderThumb>
            </Slider>
        </Box>
    )
}

export default SliderTimer