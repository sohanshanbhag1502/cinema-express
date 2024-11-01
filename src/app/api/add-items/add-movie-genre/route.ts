import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId, genre} = body;
    const movie = await prisma.movie.findUnique({
        where: {
            movieId
        }
    });
    if (!movie){
        return NextResponse.json({message: "Movie does not exist"}, {status: 404});
    }
    await prisma.movieGenre.create({
        data: {
            movieId,
            genreName: genre
        }
    });
    return NextResponse.json("Added genre to the movie successfully", {status: 200});
}