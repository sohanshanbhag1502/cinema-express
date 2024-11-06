"use client"

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function AddScreenPage(){
    const [screenId, setScreenId] = useState("");
    const [theId, setTheId] = useState("");
    const [resolution, setResolution] = useState("TwoD");

    const handleScreenChange = (e: ChangeEvent<HTMLInputElement>) => {
        setScreenId(e.target.value)
    }

    const handleTheaterChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTheId(e.target.value)
    }

    const handleResChange = (e: SelectChangeEvent<string>) => {
        setResolution(e.target.value)
    }

    const res=[["2D", "TwoD"], ["3D", "ThreeD"], ["4D", "FourD"]];

    const postScreen = async (e: FormEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        const res=await fetch('/api/admin/add-items/screen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                screenId,
                theId,
                resolution
            })
        });
        if (res.status===200){
            alert("Added the screen successfully");
        }
        else{
            alert("Something went wrong");
        }
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Screen</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[27%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Screen ID :</label>
                    <label className="text-2xl py-[0.8rem]">Theater ID :</label>
                    <label className="text-2xl py-[0.8rem]">Resolution :</label>
                </div>
                <div className="w-[73%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={screenId}
                        onChange={handleScreenChange}
                        required
                    />
                    <input
                        type="text"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={theId}
                        onChange={handleTheaterChange}
                        required
                    />
                    <ThemeProvider theme={darkTheme}>
                        <Select
                            value={resolution}
                            onChange={handleResChange}
                            sx={{
                                borderRadius:"20px", fontSize:"1.3rem"
                            }}
                        >
                            {res.map((ele, ind)=><MenuItem value={ele[1]} key={ind}
                            sx={{fontSize:"1.1rem"}}
                            >{ele[0]}</MenuItem>)}
                        </Select>
                    </ThemeProvider>
                </div>
            </div>
            <div className="w-full flex items-center content-center justify-evenly">
                <button className='p-2 bg-white text-black border-white 
                border-2 font-semibold text-xl rounded-full transition-all duration-200 
                mx-2 hover:bg-black hover:text-white'
                onClick={postScreen}>
                    Add Screen
                </button>
            </div>
        </div>
    )
}