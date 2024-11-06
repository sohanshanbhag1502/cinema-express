import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { tokenPayload, verify } from "@/lib/JWT";

interface BookingDetails{
    bookingId: string,
    movieId: string,
    movieTitle: string,
    movieYear: number,
    date: string,
    showTime: string,
    theater: string,
    address:string;
    city: string
}

export async function POST(req: NextRequest){
    const cookie = req.cookies.get('auth-token');
    const token : tokenPayload = await verify(cookie?.value, process.env.JWT_SECRET!);
    const userId = token.userId;

    if (!userId){ 
        return NextResponse.json({message: "Invalid request body"}, {status: 400});
    }

    const bookings = await prisma.booking.findMany({
        where: {
            userId
        }
    });
    const theaters = await prisma.theater.findMany(
        {
            where: {
                theId: {
                    in: bookings.map((booking)=>booking.theId)
                }
            },
            select: {
                theId: true,
                name: true,
                city: true,
                address: true
            }
        }
    );
    const movies = await prisma.movie.findMany(
        {
            where: {
                movieId: {
                    in: bookings.map((booking)=>booking.movieId)
                }
            },
            select: {
                movieId: true,
                title: true,
                pubYear: true
            }
        }
    );

    var retBody: Array<BookingDetails> = [];
    for (let ind in bookings){
        const movie=movies[movies.findIndex((pre)=>pre.movieId===bookings[ind]
        .movieId)];
        const theater=theaters[theaters.findIndex((pre)=>pre.theId===bookings[ind]
        .theId)];
        retBody.push({
            bookingId: bookings[ind].bookId,
            movieId: bookings[ind].movieId,
            movieTitle: movie.title,
            movieYear: movie.pubYear,
            date: bookings[ind].bookdate.toString().slice(0, 15),
            showTime: bookings[ind].showtime,
            theater: theater.name,
            address: theater.address,
            city: theater.city
        });
    }

    return NextResponse.json(retBody, {status: 200});
}