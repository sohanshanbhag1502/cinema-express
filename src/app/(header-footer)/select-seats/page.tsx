"use client"

import { useSearchParams } from "next/navigation";
import { SeatLayout } from "@/components/SeatLayout";
import Link from "next/link";

export default function SelectSeats(){
    const params=useSearchParams();

    const movieId=params.get('movieId');
    const movieTitle=params.get('movieTitle');
    const time=params.get('time');
    const theater=params.get('theater');
    const date=params.get('date');

    return (
        <div className="w-full p-10 flex flex-col content-center items-start">
            <h1 className="text-3xl font-bold">Select Seats for {movieTitle}</h1>
            <div className="w-full flex flex-col items-start content-center mt-4">
                <h1 className="text-xl font-semibold">Booking Details</h1>
                <p className="text-md font-medium">Theater: {theater}</p>
                <p className="text-md font-medium">Time: {time}</p>
                <p className="text-md font-medium">Date: {date}</p>
            </div>
            <SeatLayout />
            <div className="w-full flex items-center content-center justify-center">
                <Link className='p-3 bg-white text-black rounded-full
                    border-2 font-semibold text-lg transition-all duration-200
                    hover:bg-black hover:text-white'
                    href={{
                        pathname:"/payment", 
                        query:{ movieId, movieTitle, time, theater, date }
                    }}>
                    Proceed With Payment
                </Link>
            </div>
        </div>
    )
}