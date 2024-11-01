"use client"

import { useState } from "react";
import type { FormEvent } from "react";

export default function AddTheaterPage(){
    const [theId, setTheId] = useState("")
    const [name, setName] = useState("")
    const [city, setCity] = useState("")
    const [address, setAddress] = useState("")

    const handleTheChange = (e: FormEvent<HTMLInputElement>) => {
        setTheId(e.currentTarget.value)
    }

    const handleNameChange = (e: FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const handleCityChange = (e: FormEvent<HTMLInputElement>) => {
        setCity(e.currentTarget.value)
    }

    const handleAddressChange = (e: FormEvent<HTMLInputElement>) => {
        setAddress(e.currentTarget.value)
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Movie</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[30%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Theater ID :</label>
                    <label className="text-2xl py-[0.8rem]">Theater Name :</label>
                    <label className="text-2xl py-[0.8rem]">City :</label>
                    <label className="text-2xl py-[0.8rem]">Address :</label>
                </div>
                <div className="w-[70%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={theId}
                        onChange={handleTheChange}
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={city}
                        onChange={handleCityChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={address}
                        onChange={handleAddressChange}
                        required
                    />
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 bg-white text-black border-white 
                border-2 font-semibold text-xl rounded-full transition-all duration-200 
                mx-2 hover:bg-black hover:text-white'>
                    Add Movie
                </button>
            </div>
        </div>
    )
}