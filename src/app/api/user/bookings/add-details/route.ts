import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { tokenPayload, verify } from "@/lib/JWT";
import { BookedSeat } from "@prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { movieId, theaterId, date, time, seats, amount, method } = body;

    const cookie = req.cookies.get('auth-token');
    const token : tokenPayload = await verify(cookie?.value, process.env.JWT_SECRET!);

    if (!amount || !method || !movieId || !theaterId || !date || 
        !time || !seats) {
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    const bookingCount = await prisma.booking.count()+1;
    const bookingId = "B"+bookingCount.toString().padStart(4, '0');

    const tranId=Math.floor(100000000 + Math.random() * 900000000);

    const screenId = (await prisma.hostMovie.findFirst({
        where: {
            theId:theaterId,
            movieId:movieId
        }
    }))?.screenId;

    if (!screenId){
        return NextResponse.json({message: "Something went wrong"}, {status: 400});
    }

    if (!token || !token.userId){
        return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    await prisma.booking.create({
        data: {
            bookId: bookingId,
            movieId,
            theId:theaterId,
            screenId,
            userId:token.userId,
            showtime: time,
            bookdate: new Date(date),
            seats:seats.reduce((acc:string, ele:string)=>acc+ele+", ", "").slice(0, -2)
        }
    });

    const writeData: Array<BookedSeat> = seats.map((ele:string)=>{return {
        seatRow: ele.split('-')[0],
        seatCol: ele.split('-')[1],
        bookId: bookingId,
        screenId,
        bookedTime: new Date(new Date(date).toISOString().split('T')[0]+"T"+time),
        theId: theaterId,
        movieId
    }});
    await prisma.bookedSeat.createMany({
        data: writeData
    });

    await prisma.payment.create({
        data: {
            amount,
            method,
            tranId,
            bookId:bookingId
        }
    });

    return NextResponse.json({bookingId}, {status: 200});
}