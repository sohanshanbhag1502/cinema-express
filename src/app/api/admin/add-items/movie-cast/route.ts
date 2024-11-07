import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId, castId} = body;

    try{
        const cast = await prisma.cast.findUnique({
            where: {
                castId
            }
        });
        if (!cast){
            return NextResponse.json({message: "Cast does not exist"}, {status: 400});
        }
    }
    
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        const movie = await prisma.movie.findUnique({
            where: {
                movieId
            }
        });
        if (!movie){
            return NextResponse.json({message: "Movie does not exist"}, {status: 400});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        await prisma.movieCast.create({
            data: {
                movieId,
                castId
            }
        });
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json("Added cast to the movie successfully", {status: 200});
}