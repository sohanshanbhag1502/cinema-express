"use client"

import { BookingCard } from "@/components/Cards";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

interface BookingDetails{
    bookingId: string,
    movieId: string,
    movieTitle: string,
    movieYear: string,
    date: string,
    showTime: string,
    theater: string,
    address:string;
    city: string
}

export default function MyBookings(){

    const [bookings, setBookings] = useState<Array<BookingDetails>>([]);
    const router = useRouter();
    const {enqueueSnackbar} = useSnackbar();

    const fetchAllBookings = async ()=>{
        const res=await fetch('/api/user/bookings/all-bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (res.status===200){
            setBookings(await res.json());
        }
        else{
            enqueueSnackbar("Something went wrong while getting all bookings", 
                {variant: 'error'});
            router.push('/');
        }
    }

    useEffect(()=>{ fetchAllBookings() }, [])

    return (
        <div className="w-full p-10 flex flex-col items-start content-center">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <div className="w-full p-5 flex flex-col items-center content-center">
                {bookings.map((value)=><BookingCard {...value} key={value.bookingId}/>)}
            </div>
        </div>
    )
}