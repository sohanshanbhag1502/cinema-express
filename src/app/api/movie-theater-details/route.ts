import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import TheaterSchema from "@/lib/models/theater";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId, theaterId, cost} = body;

    if (!movieId || !theaterId){
        return NextResponse.json({message: "Invalid Details for the request"}, 
            {status: 400});
    }

    const movie = await prisma.movie.findUnique({
        where: {
            movieId
        }
    });

    if (!movie){
        return NextResponse.json({message: "Movie not found"}, {status: 404});
    }

    const theater = await prisma.theater.findUnique({
        where: {
            theId: theaterId
        }
    });

    if (!theater){
        return NextResponse.json({message: "Theater not found"}, {status: 404});
    }

    if (cost){
        const cost=(await prisma.hostMovie.findFirst({
            where: {
                movieId,
                theId: theaterId
            },
            select: {
                cost: true
            }
        }))?.cost;
        return NextResponse.json({movie, theater, cost}, 
            {status: 200});
    }

    return NextResponse.json({movie, theater}, {status: 200});
}