"use client"

import { useState } from "react";
import type { FormEvent } from "react";

export default function AddMoviePage(){
    const [movieId, setMovieId] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")
    const [ageRating, setAgeRating] = useState("")
    const [pubYear, setPubYear] = useState("")
    const [rating, setRating] = useState(0)
    const [ratingCount, setRatingCount] = useState(0)

    const handleMovieChange = (e: FormEvent<HTMLInputElement>) => {
        setMovieId(e.currentTarget.value)
    }

    const handleTitleChange = (e: FormEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const handleDescChange = (e: FormEvent<HTMLInputElement>) => {
        setDescription(e.currentTarget.value)
    }

    const handleDurationChange = (e: FormEvent<HTMLInputElement>) => {
        setDuration(e.currentTarget.value)
    }

    const handleARChange = (e: FormEvent<HTMLInputElement>) => {
        setAgeRating(e.currentTarget.value)
    }

    const handlePYChange = (e: FormEvent<HTMLInputElement>) => {
        setPubYear(e.currentTarget.value)
    }

    const handleRatingChange = (e: FormEvent<HTMLInputElement>) => {
        setRating(parseInt(e.currentTarget.value))
    }

    const handleRatingCChange = (e: FormEvent<HTMLInputElement>) => {
        setRatingCount(parseInt(e.currentTarget.value))
    }

    return (
        <div className="w-full flex flex-col items-center content-center justify-center 
        p-10">
            <h1 className="font-bold text-4xl">Add Movie</h1>
            <div className="w-[50%] flex py-5 items-center content-center">
                <div className="w-[30%] flex flex-col items-start content-center">
                    <label className="text-2xl py-[0.8rem]">Movie ID :</label>
                    <label className="text-2xl py-[0.8rem]">Title :</label>
                    <label className="text-2xl py-[0.8rem]">Description :</label>
                    <label className="text-2xl py-[0.8rem]">Duration :</label>
                    <label className="text-2xl py-[0.8rem]">Age Rating :</label>
                    <label className="text-2xl py-[0.8rem]">Publish Year :</label>
                    <label className="text-2xl py-[0.8rem]">Rating :</label>
                    <label className="text-2xl py-[0.8rem]">Rating Count:</label>
                </div>
                <div className="w-[70%] flex flex-col items-start content-center">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={movieId}
                        onChange={handleMovieChange}
                        required
                    />
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={description}
                        onChange={handleDescChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={duration}
                        onChange={handleDurationChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={ageRating}
                        onChange={handleARChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={pubYear}
                        onChange={handlePYChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={rating}
                        onChange={handleRatingChange}
                        required
                    />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="my-[0.63rem] p-1 border border-gray-300 rounded-lg 
                        text-white w-full bg-transparent text-xl text-start"
                        value={ratingCount}
                        onChange={handleRatingCChange}
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