"use client"

import { useSearchParams } from "next/navigation";

export default function BookingConfirmationPage(){
    const params=useSearchParams();

    const movieTitle="Devara - Part 1";
    const time="10:00 AM";
    const theater="Royal Meenakshi Mall, Bannerghatta Road";
    const date='13/10/2024 Sun';
    const seats=localStorage.getItem("Seats");
    const amount=seats?.split(",").length*1000;

    const bookingId="1000"

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
                // const originalHTML = document.body.innerHTML;
                // window.print();
                // document.querySelectorAll('nav')
                //     .forEach(nav => nav.remove())
                window.print();
                // document.body.innerHTML = originalHTML;
            }}
            >
                Print Ticket
            </button>
        </div>
    )
}