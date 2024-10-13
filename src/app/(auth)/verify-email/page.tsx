"use client"

import { useRouter } from "next/navigation"
import React, { useState } from "react"

function VerifyCodepage() {
    const [code, setCode] = useState()
    const handleCodeChange = (e: HTMLFormElement) => {
        setCode(e.target.value)
    }
    const router = useRouter()

    const handleSubmit=async (e: HTMLFormElement)=>{
        e.preventDefault()
        const res=await fetch('/api/verify-otp/verify-otp',{
            method:"POST",
            headers:{"Content-Type":"application/json",
            "Cookie":"sessionToken"},
            body:JSON.stringify({otp:code})
        })
        const message=await res.json()

        if (message.message==="invalidOTP"){
            alert("The otp provided is invalid")
        }
        else if (message.message==="otpVerified"){
            router.push('/login')
            alert("You have successfully registered in C3Club.")
        }
        else{
            alert("Sorry unable to reach the server at the moment.")
        }
    }

    const resendOtp=async ()=>{
        const res=await fetch('/api/verify-otp/resend-otp',{
            method:"POST",
            headers:{"Content-Type":"application/json",
            "Cookie":"sessionToken"}
        })
        const message=await res.json()

        if (message.message==="otpResent"){
            alert("OTP has been resent to the provided mail")
        }
        else if (message.message==="tooManyRequests"){
            alert("You can try resending otp only 5 times. Please try again later.")
        }
        else{
            alert("Sorry unable to reach the server at the moment.")
        }
    }

    return (
        <>
            <h1 className="text-3xl p-4">Email Verification</h1>
            <p className="text-xl p-2">
                Enter the 6 digit otp sent to your mail
            </p>
            <div className="flex flex-row content-center items-center">
                <input
                    type="text"
                    inputMode="numeric"
                    className="text-xl p-2 m-2 rounded-3xl text-white 
                    bg-transparent border border-gray-600 w-full justify-center 
                    text-center"
                    placeholder="XXXXXX"
                    maxLength={6}
                    onChange={handleCodeChange}
                    required
                    autoFocus
                />
            </div>
            <p className="text-white font-medium">
                Didn't get the otp?&nbsp;
                <span className="text-blue-400 hover:underline cursor-pointer" 
                onClick={resendOtp}>Resend</span>
            </p>
            <button
                type="submit"
                className="p-2 my-4 bg-blue-800 hover:bg-blue-700 
                text-white text-center rounded-3xl text-xl w-[40%]"
            >
                Proceed
            </button>
        </>
    )
}

export default VerifyCodepage
