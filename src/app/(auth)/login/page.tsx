"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import type { ChangeEvent } from "react";

function Loginpage() {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const router=useRouter()
    const handleUserNameChange = (e:ChangeEvent) => {
        setUserName(e.target.value)
    }
    const handlePasswordChange = (e:ChangeEvent) => {
        setPassword(e.target.value)
    }
    const postLogin = async (e:ChangeEvent) => {
        e.preventDefault()
        const res=await fetch('/api/login', {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({userName:userName, password:password})
        })
        const message=await res.json()
        if (message.message==="success"){
            router.push('/')
        }
        else if (message.message==="userNotVerified"){
            const res=await fetch('/api/verify-otp/send-otp',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({userName:userName})
            })
            const message=await res.json()
            if (message.message==="internalServerError"){
                alert("Sorry unable to communicate with server at the moment.")
                return
            }
            router.push('/verify-email')
        }
        else if (message.message==='incorrectPassword'){
            alert("Password is incorrect.")
        }
        else if (message.message==='invalidCredentials'){
            alert("Username not registered")
        }
        else{
            alert("Sorry unable to reach the server at the moment.")
        }
    }
    return (
        <>
            <h1 className="text-2xl md:text-4xl mb-8 font-semibold text-white">
                Login
            </h1>
            <input
                type="text"
                id="username"
                name="username"
                className="w-[60%] p-3 border border-gray-300 rounded-3xl 
                bg-transparent text-xl text-center"
                placeholder="Username"
                value={userName}
                onChange={handleUserNameChange}
                autoFocus
                required
            />
            <input
                type="password"
                id="password"
                name="password"
                className="w-[60%] mt-5 p-3 border border-gray-300 rounded-3xl
                text-white bg-transparent text-xl text-center"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
            />
            <button className="mt-7 w-[50%] bg-blue-500 font-semibold text-xl
                text-white p-2 rounded-full hover:bg-blue-600 transition">
                Login
            </button>
            <div className="flex text-center content-center items-center justify-center 
            w-full pt-8">
                <p className="font-medium text-lg">Don&apos;t have an account?&nbsp;</p>
                <Link
                    href="/register"
                    className="text-blue-300 hover:underline font-medium text-lg
                    cursor-pointer">
                    Register
                </Link>
            </div>
        </>
    )
}

export default Loginpage
