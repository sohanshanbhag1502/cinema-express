"use client"

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";

export default function ProfilePage(){
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [gender, setGender] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")

    const handleNameChange = (e: FormEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const handlePhoneNoChange = (e: FormEvent<HTMLInputElement>) => {
        setPhoneNo(e.currentTarget.value)
    }

    const handleAgeChange = (e: FormEvent<HTMLInputElement>) => {
        setAge(e.currentTarget.value)
    }

    const handleEmailChange = (e: FormEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
    }

    const handleDobChange = (e: FormEvent<HTMLInputElement>) => {
        setDob(e.currentTarget.value)
    }

    const handleGenderChange = (e: FormEvent<HTMLInputElement>) => {
        setGender(e.currentTarget.value)
    }

    const handleUserNameChange = (e: FormEvent<HTMLInputElement>) => {
        setUserName(e.currentTarget.value)
    }

    const handlePasswordChange = (e: FormEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }

    const handleRePasswordChange = (e: FormEvent<HTMLInputElement>) => {
        setRePassword(e.currentTarget.value)
    }
    
    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">My Profile</h1>
            <div className="w-[50%] flex py-10 items-center content-center">
                <div className="w-[25%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Name:</label>
                    <label className="text-2xl py-[0.8rem]">Username:</label>
                    <label className="text-2xl py-[0.8rem]">Email:</label>
                    <label className="text-2xl py-[0.8rem]">Phone No:</label>
                    <label className="text-2xl py-[0.8rem]">DOB:</label>
                    <label className="text-2xl py-[0.8rem]">Age:</label>
                    <label className="text-2xl py-[0.8rem]">Gender:</label>
                </div>
                <div className="w-[75%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={userName}
                        onChange={handleUserNameChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="phoneNo"
                        id="phoneNo"
                        name="phoneNo"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={phoneNo}
                        onChange={handlePhoneNoChange}
                        required
                    />
                    <input
                        type="date"
                        id="DOB"
                        name="DOB"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg
                        text-white w-full bg-transparent text-xl text-start"
                        value={dob}
                        onChange={handleDobChange}
                        required
                    />
                    <input
                        type="number"
                        id="age"
                        name="age"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg
                        text-white w-full bg-transparent text-xl text-start"
                        value={age}
                        min={0}
                        onChange={handleAgeChange}
                        required
                    />
                    <div className="w-full flex items-center content-center justify-start
                    my-[0.63rem]">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            onChange={handleGenderChange}
                            className="mr-2 cursor-pointer"
                            required
                        />
                        <label
                            htmlFor="male"
                            className="text-2xl font-medium text-white"
                        >
                            Male
                        </label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            onChange={handleGenderChange}
                            className="ml-4 mr-2 cursor-pointer"
                            required
                        />
                        <label
                            htmlFor="female"
                            className="text-2xl font-medium text-white"
                        >
                            Female
                        </label>
                    </div>
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 mt-6 bg-white text-black border-white border-2
                font-semibold text-xl rounded-full transition-all duration-200 mx-2
                hover:bg-black hover:text-white'>
                    Update My Profile
                </button>
                <Link className='p-2 mt-6 bg-white text-black border-white border-2
                font-semibold text-xl rounded-full transition-all duration-200 mx-2
                hover:bg-black hover:text-white' href='/change-password'>
                    Change My Password
                </Link>
                <Link className='p-2 mt-6 bg-white text-black border-white border-2
                font-semibold text-xl rounded-full transition-all duration-200 mx-2
                hover:bg-black hover:text-white' href='/my-bookings'>
                    Go to My Bookings
                </Link>
            </div>
        </div>
    )
}