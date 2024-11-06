"use client"

import { useSearchParams } from "next/navigation";
import { Movie, Theater } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSnackbar } from "notistack";

interface Details{
    movie: Movie;
    theater: Theater;
    cost: number;
}

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function PaymentPage(){
    const params=useSearchParams();
    const {enqueueSnackbar}=useSnackbar();

    const movieId=params.get('movieId');
    const time=params.get('time');
    const theaterId=params.get('theaterId');
    const date=params.get('date');
    const router=useRouter();

    const seats=localStorage.getItem("seats");
    const seatList:Array<string>=JSON.parse(seats?seats:"[]");

    const [movie, setMovie]=useState<Movie>();
    const [theater, setTheater]=useState<string>();
    const [method, setMethod]=useState<string>("UPI");
    const [cost, setCost]=useState<number>(0);
    const methods=["UPI", "Credit Card", "Debit Card", "Net Banking"];

    const fetchDetails = async()=>{
        const res=await fetch('/api/movie-theater-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId,
                theaterId,
                cost: true
            })
        });
        if (res.status!==200){
            enqueueSnackbar("Invalid Details Provided", {variant: 'error'});
            router.push('/');
            return;
        }
        const data : Details = await res.json();
        setTheater(data.theater.name+", "+data.theater.address+", "+data.theater.city);
        setMovie(data.movie);
        setCost(data.cost);
    }

    const bookTicket = async ()=>{
        const res=await fetch('/api/user/bookings/add-details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                movieId,
                theaterId,
                date,
                time,
                seats: seatList,
                amount,
                method
            })
        });
        const {bookingId}=await res.json();
        if (res.status===200){
            localStorage.removeItem("seats");
            router.push(`/user/booking-confirmation?bookingId=${bookingId}`);
        }
        else{
            enqueueSnackbar("Payment Failed", {variant: 'error'});
        }
    }

    useEffect(()=>{
        fetchDetails();
    }, []);

    const amount=seatList.length*cost;

    return (
        <div className="w-full p-10 flex flex-col items-center content-center 
        justify-center">
            <h1 className="text-3xl font-bold">Payment Confirmation</h1>
            <div className="flex flex-col items-center content-center mt-10">
                <h1 className="text-2xl font-semibold">Confirm your Booking Details</h1>
                <p className="text-xl font-medium">Movie: {movie?.title}</p>
                <p className="text-xl font-medium">Theater: {theater}</p>
                <p className="text-xl font-medium">Date: {date}</p>
                <p className="text-xl font-medium">Show Time: {time}</p>
                <p className="text-xl font-medium">
                    Selected Seats: {
                        seatList.reduce((acc, ele)=>acc+ele+", ", "").slice(0, -2)
                    }
                </p>
                <div className="w-full flex items-center content-center justify-center">
                    <p className="text-xl font-medium">Payment Method:</p>
                    <ThemeProvider theme={darkTheme}>
                        <Select
                            value={method}
                            onChange={(e:SelectChangeEvent<string>)=>
                                {setMethod(e.target.value)}}
                            sx={{
                                borderRadius:"50px", fontSize:"1.3rem", margin:"1rem"
                            }}
                        >
                            {methods.map((ele, ind)=><MenuItem value={ele} key={ind}
                            sx={{fontSize:"1.1rem"}}
                            >{ele}</MenuItem>)}
                        </Select>
                    </ThemeProvider>
                </div>
                <p className="text-2xl font-bold p-2">Total Amount: ₹{amount}</p>
            </div>
            <button className='p-2 mt-6 bg-white text-black border-white border-2
                font-semibold text-xl rounded-full transition-all duration-200 mx-2
                hover:bg-black hover:text-white'
            onClick={bookTicket}>
                Confirm Payment
            </button>
        </div>
    )

}