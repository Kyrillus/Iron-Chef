import React from 'react';
import {Button, useColorMode} from "@chakra-ui/react";
import {DarkModeSwitch} from "react-toggle-dark-mode";

function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <div className="h-24 w-screen items-center flex sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-sm bg-opacity-10 border-b">
            {/* Navbar Content */}
            <div className="flex flex-row justify-between px-24 w-full">
                {/* Left */}
                <div className="flex flex-col select-none">
                    <p className="font-bold text-2xl">SPACELESS <span className="text-purple-400">AI</span></p>
                    <p className={"text-left font-[500] " + (colorMode === "dark" ? "text-white" : "text-gray-800")}>Chef Edition 🍴</p>
                </div>
                {/* Right */}
                <div className="border border-gray-300 p-1 rounded-lg h-fit w-fit shadow-lg mt-1.5">
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