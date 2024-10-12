"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

function VerifyCodepage() {
    const [code, setCode] = useState()
    const handleCodeChange = (e) => {
        setCode(e.target.value)
    }
    const router = useRouter()

    const handleSubmit=async (e)=>{
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
            <h1 className="absolute text-5xl top-8 text-white text-center">
                C<sup>3</sup> Club
            </h1>
            <div className="h-screen w-full flex justify-center items-center">
                <div
                    className="bg-transparent p-3 md:p-6 rounded-lg w-4/5 md:w-2/3 lg:w-1/3 
        xl:w-1/3 form-container text-white text-center flex flex-col items-center 
        content-center"
                >
                    <h1 className="text-3xl p-4">Email Verification</h1>
                    <p className="text-xl p-2">
                        Enter the 6 digit otp sent to your mail
                    </p>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="flex flex-row content-center items-center">
                            <input
                                type="text"
                                inputMode="numeric"
                                className="text-xl p-2 m-2 rounded-3xl text-white bg-transparent border 
                border-gray-600 w-full justify-center text-center"
                                placeholder="XXXXXX"
                                maxLength={6}
                                onChange={handleCodeChange}
                                required
                            />
                        </div>
                        <p className="text-white">
                            Didn't get the otp?&nbsp;
                            <span className="text-blue-400 hover:underline cursor-pointer" onClick={resendOtp}>Resend</span>
                        </p>
                        <button
                            type="submit"
                            className="p-2 my-4 bg-blue-800 hover:bg-blue-700 
            text-white text-center rounded-3xl text-xl w-full"
                        >
                            Proceed
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default VerifyCodepage
