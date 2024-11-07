import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import prisma from "../../../prisma/client";

export async function POST(req: NextRequest){
    const body = await req.json();
    const {movieId} = body;

    if (!movieId){
        return NextResponse.json({message: "Movie ID is required"}, {status: 400});
    }

    try{
        var movie = await prisma.movie.findUnique({
            where: {
                movieId
            }
        });

        if (!movie){
            return NextResponse.json({message: "Movie not found"}, {status: 404});
        }

        var movieLangs = (await prisma.movieLang.findMany({
            where: {
                movieId
            }
        })).map((movie) => movie.lang);
        var movieGenres = (await prisma.movieGenre.findMany({
            where: {
                movieId
            }
        })).map((movie) => movie.genreName);
        var movieCastIds = (await prisma.movieCast.findMany({
            where: {
                movieId
            }
        })).map((movie) => movie.castId);
        var movieCasts = await prisma.cast.findMany({
            where: {
                castId: {
                    in: movieCastIds
                }
            }
        });
    }
    catch(e){
        return NextResponse.json({message:"Unable to connect to database"}, 
            {status:500})
    }

    return NextResponse.json({movie, lang:movieLangs, casts:movieCasts,
        genres:movieGenres}, {status: 200});
}