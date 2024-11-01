"use client"

import { useState } from "react";
import type { FormEvent } from "react";

export default function AddCastPage(){
    const [castId, setCastId] = useState("")
    const [name, setName] = useState("")
    const [role, setRole] = useState("")

    const handleNameChange = (e: FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const handleCastIdChange = (e: FormEvent<HTMLInputElement>) => {
        setCastId(e.currentTarget.value)
    }

    const handleRoleChange = (e: FormEvent<HTMLInputElement>) => {
        setRole(e.currentTarget.value)
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Cast</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[17%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Cast ID :</label>
                    <label className="text-2xl py-[0.8rem]">Name :</label>
                    <label className="text-2xl py-[0.8rem]">Role :</label>
                </div>
                <div className="w-[83%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={castId}
                        onChange={handleCastIdChange}
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
                        value={role}
                        onChange={handleRoleChange}
                        required
                    />
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 bg-white text-black border-white 
                border-2 font-semibold text-xl rounded-full transition-all duration-200 
                mx-2 hover:bg-black hover:text-white'>
                    Add Cast
                </button>
            </div>
        </div>
    )
}