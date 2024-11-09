import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { movieId, date, time, theaterId } = body;

    if (!movieId || !theaterId || !date || !time){ 
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    try{
        var bookedSeats = (await prisma.bookedSeat.findMany({
            where: {
                movieId,
                bookingDate: date.trim(),
                bookingTime: time.trim(),
                theId:theaterId
            }
        })).map((seat)=>seat.seatRow.trim()+'-'+seat.seatCol.trim());
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json(bookedSeats, {status: 200});
}