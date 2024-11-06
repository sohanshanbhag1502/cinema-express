"use client"

import { useSearchParams } from "next/navigation";
import { SeatLayout } from "@/components/SeatLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SelectSeats(){
    const params=useSearchParams();
    const router=useRouter();

    const movieId=params.get('movieId');
    const theaterId=params.get('theaterId');
    const time=params.get('time');
    const date=params.get('date');
    const [theater, setTheater] = useState("");
    const [movie, setMovie] = useState("");
    const [bookedList, setBookedList] = useState<Array<string>>([]);

    const fetchDetails = async()=>{
        const res=await fetch('/api/movie-theater-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId,
                theaterId
            })
        });
        if (res.status!==200){
            router.push('/');
            return;
        }
        const data = await res.json();
        setTheater(data.theater.name+", "+data.theater.address+", "+data.theater.city);
        setMovie(data.movie.title);
    }

    const fetchBookedSeats = async()=>{
        const res=await fetch('/api/user/bookings/booked-seats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId,
                theaterId,
                time,
                date
            })
        });
        if (res.status!==200){
            alert('Invalid Details Provided');
            router.push('/');
            return;
        }
        const data = await res.json();
        console.log(data);
        setBookedList(data);
    }

    useEffect(()=>{
        fetchDetails();
        fetchBookedSeats();
    },[]);

    localStorage.clear();

    return (
        <div className="w-full p-10 flex flex-col content-center items-start">
            <h1 className="text-3xl font-bold">Select Seats for {movie}</h1>
            <div className="w-full flex flex-col items-start content-center mt-4">
                <h1 className="text-xl font-semibold">Booking Details</h1>
                <p className="text-md font-medium">Theater: {theater}</p>
                <p className="text-md font-medium">Show Time: {time}</p>
                <p className="text-md font-medium">Date: {date}</p>
            </div>
            <SeatLayout bookedList={bookedList}/>
            <div className="w-full flex items-center content-center justify-center">
                <Link className='p-3 bg-white text-black rounded-full
                    border-2 font-semibold text-lg transition-all duration-200
                    hover:bg-black hover:text-white'
                    href={{
                        pathname:"/user/payment", 
                        query:{ movieId, theaterId, time, date }
                    }}>
                    Proceed With Payment
                </Link>
            </div>
        </div>
    )
}