import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();

    const { bookingId } = body;

    if (!bookingId) {
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    const [booking, payment] = await Promise.all([prisma.booking.findUnique({
        where: {
            bookId: bookingId
        }
    }), prisma.payment.findFirst({
        where: {
            bookId: bookingId
        }
    })]);
    const theater = await prisma.theater.findUnique({
        where: {
            theId: booking?.theId
        }
    });
    const movie = await prisma.movie.findUnique({
        where: {
            movieId: booking?.movieId
        }
    });

    return NextResponse.json({
        theater: theater?.name,
        movieTitle:movie?.title, 
        date: booking?.bookdate, 
        time: booking?.showtime, 
        seats: booking?.seats, 
        amount: payment?.amount
    }, {status: 200});
}