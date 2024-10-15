"use client"

import { BookingCard } from "@/components/Cards"

export default function MyBookings(){
    const bookings=[
        {bookingId:"1000", movieTitle:"Devara", movieYear:"2024", date:"14/10/2024", 
            showTime:"10:00 AM", theater:"Royal Meenakshi Mall, Bannerghatta Road",
            city:"Bengaluru"}, 
        {bookingId:"1000", movieTitle:"Raayan", movieYear:"2024", date:"12/10/2024", 
            showTime:"10:00 AM", theater:"Galleria Mall, Yelahanka",
            city:"Bengaluru"}, 
        {bookingId:"1000", movieTitle:"Deadpool & Wolverine", movieYear:"2024", 
            date:"14/10/2024", showTime:"10:00 AM", 
            theater:"Vega City Mall, Bannerghatta Road", city:"Bengaluru"}
    ]

    return (
        <div className="w-full p-10 flex flex-col items-start content-center">
            <h1 className="text-3xl font-bold">My Bookings</h1>
            <div className="w-full p-5 flex flex-col items-center content-center">
                {bookings.map((value)=><BookingCard {...value} />)}
            </div>
        </div>
    )
}