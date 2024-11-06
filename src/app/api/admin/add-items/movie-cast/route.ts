import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId, castId} = body;
    const cast = await prisma.cast.findUnique({
        where: {
            castId
        }
    });
    if (!cast){
        return NextResponse.json({message: "Cast does not exist"}, {status: 400});
    }
    const movie = await prisma.movie.findUnique({
        where: {
            movieId
        }
    });
    if (!movie){
        return NextResponse.json({message: "Movie does not exist"}, {status: 400});
    }
    await prisma.movieCast.create({
        data: {
            movieId,
            castId
        }
    });
    return NextResponse.json("Added cast to the movie successfully", {status: 200});
}