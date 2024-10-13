"use client"

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentPage(){
    const params=useSearchParams();

    const movieId=params.get('movieId');
    const movieTitle=params.get('movieTitle');
    const time=params.get('time');
    const theater=params.get('theater');
    const date=params.get('date');

    const seats=localStorage.getItem("Seats");

    const amount=seats?.split(",").length*1000
    const bookingId="1000"

    return (
        <div className="w-full p-10 flex flex-col items-center content-center 
        justify-center">
            <h1 className="text-3xl font-bold">Payment Confirmation</h1>
            <div className="flex flex-col items-center content-center mt-10">
                <h1 className="text-2xl font-semibold">Confirm your Booking Details</h1>
                <p className="text-xl font-medium">Theater: {theater}</p>
                <p className="text-xl font-medium">Date: {date}</p>
                <p className="text-xl font-medium">Show Time: {time}</p>
                <p className="text-xl font-medium">Selected Seats: {seats}</p>
                <p className="text-2xl font-bold p-2">Total Amount: ₹{amount}</p>
            </div>
            <Link className='p-2 mt-6 bg-white text-black border-white border-2
                font-semibold text-xl rounded-full transition-all duration-200 mx-2
                hover:bg-black hover:text-white'
            href={{
                pathname:"/booking-confirmation", 
                query:{
                    bookingId
                }
            }}>
                Confirm Payment
            </Link>
        </div>
    )

}