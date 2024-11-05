import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId, city} = body;

    if (!movieId){
        return NextResponse.json({message: "Movie ID is required"}, {status: 400});
    }

    const movie = await prisma.movie.findUnique({
        where: {
            movieId
        }
    });

    if (!movie){
        return NextResponse.json({message: "Movie not found"}, {status: 404});
    }

    var theaters = (await prisma.theater.findMany({
        where : {
            city
        }
    }))

    var theaterIds=theaters.map((val)=>val.theId)

    const shows = await prisma.hostMovie.findMany({
        where: {
            theId : {
                in: theaterIds
            },
            movieId
        }
    })

    theaterIds=shows.map((val)=>val.theId)

    theaters=await prisma.theater.findMany({
        where: {
            theId : {
                in: theaterIds
            }
        }
    })

    return NextResponse.json({shows, theaters}, {status: 200});
}