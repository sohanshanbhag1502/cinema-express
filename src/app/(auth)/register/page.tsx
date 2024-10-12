"use client"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import type { ChangeEvent } from "react"

function SignupPage() {
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [age, setAge] = useState("")
    const [email, setEmail] = useState("")
    const [dob, setDob] = useState("")
    const [gender, setGender] = useState("")
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [repassword, setRePassword] = useState("")
    const router = useRouter()

    const handleNameChange = (e: ChangeEvent) => {
        setName(e.target.value)
    }

    const handlePhoneNoChange = (e: ChangeEvent) => {
        setPhoneNo(e.target.value)
    }

    const handleAgeChange = (e: ChangeEvent) => {
        setAge(e.target.value)
    }

    const handleEmailChange = (e: ChangeEvent) => {
        setEmail(e.target.value)
    }

    const handleDobChange = (e: ChangeEvent) => {
        setDob(e.target.value)
    }

    const handleGenderChange = (e: ChangeEvent) => {
        setGender(e.target.value)
    }

    const handleUserNameChange = (e: ChangeEvent) => {
        setUserName(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent) => {
        setPassword(e.target.value)
    }

    const handleRePasswordChange = (e: ChangeEvent) => {
        setRePassword(e.target.value)
    }

    const postSignUp = async (e: ChangeEvent) => {
        e.preventDefault()
        if (password!==repassword){
            alert("The password and re-enter password must match.")
            return
        }
        const details={
            userName:userName,
            fullName:name,
            password:password,
            email:email,
            phoneNumber:phoneNo,
            dob:new Date(dob),
            age:age,
            gender:gender
        }
        const res=await fetch('/api/signup', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(details)
        })
        const message=await res.json()
        if (message.message==="userCreated"){
            const res=await fetch('/api/verify-otp/send-otp',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({email:email})
            })
            const message=await res.json()
            if (message.message==="internalServerError"){
                alert("Sorry unable to communicate with server at the moment.")
                return
            }
            router.push("/verify-email")
        }
        else if (message.message==="weakPassword"){
            alert("Use a password which contains minimum 6 characters with minimum\
            1 lower case alphabet, 1 upper case alphabet, 1 special character and 1 digit.")
        }
        else if (message.message==="userAlreadyExists"){
            alert("The email or username given is already in use.")
        }
        else{
            alert("Sorry unable to communicate with server at the moment.")
        }
    }

    return (
        <div className="min-h-screen w-full flex flex-col justify-center items-center 
        text-white authpages">
            <img className="w-[13%] mb-3" src="/logo.png"></img>
            <div className="sm:w-[80%] md:w-[60%] bg-black bg-opacity-45 px-10 py-5
            backdrop-blur-md shadow-md shadow-gray-900 rounded-3xl border-white
            border-[1px] flex flex-col content-center items-center justify-center">
                <h1 className="text-2xl md:text-4xl pt-5 font-semibold text-center">
                    Welcome to Cinema Express
                </h1>
                <h1 className="pb-5 text-xl font-semibold text-center">
                    Enter your details to get started
                </h1>
                <div className="w-full flex flex-col md:flex-row md:justify-between pt-1">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Username"
                        value={userName}
                        onChange={handleUserNameChange}
                        required
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between pt-1">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                    <input
                        type="phoneNo"
                        id="phoneNo"
                        name="phoneNo"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Phone Number"
                        value={phoneNo}
                        onChange={handlePhoneNoChange}
                        required
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between pt-1">
                    <input
                        type="date"
                        id="DOB"
                        name="DOB"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={handleDobChange}
                        required
                    />
                    <input
                        type="number"
                        id="age"
                        name="age"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Age"
                        value={age}
                        min={0}
                        onChange={handleAgeChange}
                        required
                    />
                </div>

                <div className="w-full flex flex-col md:flex-row md:justify-between pt-1">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <input
                        type="password"
                        id="repassword"
                        name="repassword"
                        className="m-1 p-3 border border-gray-300 rounded-3xl 
                        text-white w-full bg-transparent text-xl text-center"
                        placeholder="Re-enter Password"
                        value={repassword}
                        min={0}
                        onChange={handleRePasswordChange}
                        required
                    />
                </div>
                <div className="w-full flex content-center items-center justify-center">
                    <label className="text-xl p-2">Gender:</label>
                    <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={handleGenderChange}
                        className="mr-2 cursor-pointer"
                        required
                    />
                    <label
                        htmlFor="male"
                        className="text-xl font-medium text-white"
                    >
                        Male
                    </label>
                    <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={handleGenderChange}
                        className="ml-4 mr-2 cursor-pointer"
                        required
                    />
                    <label
                        htmlFor="female"
                        className="text-xl font-medium text-white"
                    >
                        Female
                    </label>
                </div>
                <button
                    type="submit"
                    className="mt-4 w-[40%] bg-blue-500 font-semibold text-white 
                    p-2 rounded-full hover:bg-blue-600 text-xl"
                >
                    SignUp
                </button>
                <div className="flex items-center content-center text-center 
                justify-center mt-4">
                    <p className="font-medium text-lg">Already have an account?&nbsp;</p>
                    <Link href="/login" className="text-blue-400 hover:underline 
                    font-medium text-lg">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
