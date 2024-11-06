"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BookingDetails{
    movieTitle: string;
    theater: string;
    date: Date;
    time: string;
    seats: string;
    amount: number;
}

export default function BookingConfirmationPage(){
    const params=useSearchParams();
    const [movieTitle, setMovieTitle]=useState<string>("");
    const [theater, setTheater]=useState<string>("");
    const [date, setDate]=useState<string>("");
    const [time, setTime]=useState<string>("");
    const [seats, setSeats]=useState<string>("");
    const [amount, setAmount]=useState<number>(0);

    const bookingId=params.get('bookingId');
    const router=useRouter();

    const fetchDetails = async()=>{
        const res=await fetch('/api/user/bookings/fetch-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                bookingId
            })
        });
        if (res.status!==200){
            router.push('/');
            return;
        }
        const data : BookingDetails = await res.json();
        setTheater(data.theater);
        setMovieTitle(data.movieTitle);
        setDate(new Date(data.date).toDateString());
        setTime(data.time);
        setSeats(data.seats);
        setAmount(data.amount);
    }

    useEffect(()=>{
        fetchDetails();
    }, []);

    return (
        <div className="w-full p-10 flex flex-col items-center content-center">
            <img src="/logo.png" className="w-[20%] absolute top-0" 
            id="ticketlogo"/>
            <h1 className="text-3xl font-bold">Booking Confirmation</h1>
            <div className="flex flex-col items-center content-center mt-10">
                <h1 className="text-3xl font-semibold">Your Ticket</h1>
                <p className="text-xl font-medium">Movie Name: {movieTitle}</p>
                <p className="text-xl font-medium">Theater: {theater}</p>
                <p className="text-xl font-medium">Date: {date}</p>
                <p className="text-xl font-medium">Show Time: {time}</p>
                <p className="text-xl font-medium">Selected Seats: {seats}</p>
                <p className="text-2xl font-bold p-2">Total Amount: ₹{amount}</p>
            </div>
            <p className="text-lg" id="Verfication">
                This ticket is digitally verified by cinema express.
            </p>
            <button className='p-2 mt-6 bg-white text-black border-white border-2
                font-semibold text-xl rounded-full transition-all duration-200 mx-2
                hover:bg-black hover:text-white'
            onClick={()=>{
                window.print();
            }}
            >
                Print Ticket
            </button>
        </div>
    )
}