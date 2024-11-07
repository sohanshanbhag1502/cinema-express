import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {screenId, theId, movieId, cost, showtime} = body;

    if (!screenId || !theId || !movieId || !cost || !showtime){
        return NextResponse.json({message: "Invalid Request"}, {status: 400});
    }

    try{
        const screen = await prisma.screen.findUnique({
            where: {
                screenId
            }
        });
        if (!screen){
            return NextResponse.json({message: "Screen does not exist"}, {status: 404});
        }

        const theater = await prisma.theater.findUnique({
            where: {
                theId
            }
        });
        if (!theater){
            return NextResponse.json({message: "Theater does not exist"}, {status: 404});
        }

        const movie = await prisma.movie.findUnique({
            where: {
                movieId
            }
        });
        if (!movie){
            return NextResponse.json({message: "Movie does not exist"}, {status: 404});
        }
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    try{
        await prisma.hostMovie.create({
            data: {
                screenId,
                theId,
                movieId,
                cost,
                showtime
            }
        });
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({message:"Added movie to the screen successfully"}, 
        {status: 200});
}