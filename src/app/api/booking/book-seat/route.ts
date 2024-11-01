import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { movieId, dateTime, theId, seatRow, seatCol } = body;

    if (!movieId || !dateTime || !theId || !seatRow || !seatCol) {
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    const bookedSeats = await prisma.bookedSeat.create({
        data: {
            movieId,
            bookedTime:new Date(dateTime),
            theId,
            seatRow,
            seatCol
        }
    })

    return NextResponse.json(bookedSeats, {status: 200});
}