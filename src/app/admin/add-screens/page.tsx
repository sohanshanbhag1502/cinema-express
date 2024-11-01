"use client"

import { useState } from "react";
import type { FormEvent } from "react";

export default function AddScreenPage(){
    const [screenId, setScreenId] = useState("")
    const [theId, setTheId] = useState("")
    const [resolution, setResolution] = useState("")

    const handleScreenChange = (e: FormEvent<HTMLInputElement>) => {
        setScreenId(e.currentTarget.value)
    }

    const handleTheaterChange = (e: FormEvent<HTMLInputElement>) => {
        setTheId(e.currentTarget.value)
    }

    const handleResChange = (e: FormEvent<HTMLInputElement>) => {
        setResolution(e.currentTarget.value)
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Screen</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[25%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Screen ID :</label>
                    <label className="text-2xl py-[0.8rem]">Theater ID :</label>
                    <label className="text-2xl py-[0.8rem]">Resolution :</label>
                </div>
                <div className="w-[75%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={screenId}
                        onChange={handleScreenChange}
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={theId}
                        onChange={handleTheaterChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={resolution}
                        onChange={handleResChange}
                        required
                    />
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 bg-white text-black border-white 
                border-2 font-semibold text-xl rounded-full transition-all duration-200 
                mx-2 hover:bg-black hover:text-white'>
                    Add Screen
                </button>
            </div>
        </div>
    )
}