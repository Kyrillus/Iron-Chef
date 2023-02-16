import React from 'react';
import {useColorMode} from "@chakra-ui/react";
import {DarkModeSwitch} from "react-toggle-dark-mode";

function Navbar() {
    const {colorMode, toggleColorMode} = useColorMode()

    return (
        <div
            className="h-24 w-screen items-center flex sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-sm bg-opacity-10 border-b">
            {/* Navbar Content */}
            <div className="flex flex-row justify-between px-5 md:px-24 w-full">
                {/* Left */}
                <div className="flex flex-col select-none">
                    <p className="font-bold text-2xl">SPACELESS <span className="text-purple-400">AI</span></p>
                    <p className={"text-left font-[500] " + (colorMode === "dark" ? "text-white" : "text-gray-800")}>Chef
                        Edition 🍴</p>
                </div>
                {/* Right */}
                <div className=" p-2 h-fit w-fit mt-1.5">
                    <DarkModeSwitch
                        checked={colorMode === 'dark'}
                        onChange={toggleColorMode}
                        size={30}
                    />
                </div>
            </div>
        </div>
    );
}

export default Navbar;