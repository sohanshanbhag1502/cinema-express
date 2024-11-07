import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { movieId, date, time, theaterId } = body;
    var pdate = (new Date(date)).toISOString().split('T')[0];

    if (!movieId || !theaterId || !date || !time){ 
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    try{
        var bookedSeats = (await prisma.bookedSeat.findMany({
            where: {
                movieId,
                bookedTime:new Date(pdate+'T'+time),
                theId:theaterId
            }
        })).map((seat)=>seat.seatRow+'-'+seat.seatCol);
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json(bookedSeats, {status: 200});
}